import {
    getOcorrenciasDetalhes,
    pacthUpdateRegistroOcorrencia,
    getNaturezaOcorrenciaDados,
    getCategoriaOcorrenciaDados,
    getTiposVinculosUniversidade,
    postCriarRegistroOcorrencia,
} from "@/services/ocorrencia";

export default {
    created() {
        this.getDadosFormulario();
        if (this.isEditar) {
            this.getFormularioEditavel();
        }
    },
    computed: {
        naturezaOptionsFilter() {
            if (this.formOcorrencia.categoria_uid) {
                return this.naturezaOptions.filter(item => item.categoriaUid === this.formOcorrencia.categoria_uid)
            } else {
                return this.naturezaOptions;
            }

        },
        isEditar() {
            return Boolean(this.$route.params.uid);
        },
    },
    methods: {
        formatDate(date) {
            date = new Date(date);
            const year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();

            // Adiciona um zero à esquerda se o mês ou dia for menor que 10
            if (month < 10) {
                month = `0${month}`;
            }
            if (day < 10) {
                day = `0${day}`;
            }

            return `${year}-${month}-${day}`;
        },

        camelToSnake(obj) {
            if (Array.isArray(obj)) {
                return obj.map(item => this.camelToSnake(item));
            } else if (typeof obj === 'object' && obj !== null) {
                return Object.keys(obj).reduce((acc, key) => {
                    const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
                    acc[snakeKey] = this.camelToSnake(obj[key]);
                    return acc;
                }, {});
            }
            return obj;
        },
        makeVinculoUniversidadePayload() {
            return {
                ...this.formUniversidade,
            }
        },
        makePessoaPayload(universidade_uid) {
            return {
                ...this.formVitima,
                ...this.formPessoa,
                instrumento_portado: this.instrumento_portado ?? null,
                universidade_uid,
            }
        },
        makeRegistroOcorrenciaPayload(pessoa_uid, item_uid) {
            return {
                ...this.formLocal,
                ...this.formOcorrencia,
                pessoa_uid, item_uid,
            }
        },
        makeAtualizarOcorrenciaPayload() {
            delete this.updateOcorrencia.natureza_ocorrencium;
            return {
                ...this.updateOcorrencia,
                ...this.formOcorrencia,
                ...this.formLocal,
                data_ocorrencia: this.formatDate(this.updateOcorrencia.data_ocorrencia),
                item_subtraido: {
                    ...this.updateOcorrencia.item_subtraido,
                    objeto: this.objeto,
                },
                pessoa: {
                    ...this.formPessoa,
                    autor: {
                        ...this.updateOcorrencia.pessoa.autor,
                        instrumento_portado: this.instrumento_portado ?? null,
                    },
                    vitima: {
                        ...this.updateOcorrencia.pessoa.vitima,
                        ...this.formVitima,
                        data_nascimento: this.formatDate(this.formVitima.data_nascimento),
                    },
                    vinculo_universidade: {
                        ...this.formUniversidade,
                    },
                },

            }
        },
        addMarker(event) {
            const latLng = event.latlng;
            this.markers = [{
                id: this.nextMarkerId++,
                latLng: [latLng.lat, latLng.lng],
            }]
            this.formLocal.latitude = latLng.lat;
            this.formLocal.longitude = latLng.lng;
        },
        markerClicked(marker) {
            // Emita a função com os dados da latitude e longitude quando um marcador é clicado
            this.$emit("marker-clicked", marker.latLng);
        },
        back() {
            if (this.active !== 0) this.active--;
        },
        next() {
            if (this.active === 0) {
                this.$refs.formPessoa.validate(async (valid) => {
                    if (valid) {
                        this.nextStep();
                    }
                });
            } else if (this.active === 1) {
                this.$refs.formVitima.validate(async (valid) => {
                    if (valid) {
                        this.nextStep();
                    }
                });
            } else if (this.active === 2) {
                this.$refs.formOcorrencia.validate(async (valid) => {
                    if (valid) {
                        this.nextStep();
                    }
                });
            } else if (this.active === 3) {
                this.$refs.formUniversidade.validate(async (valid) => {
                    if (valid) {
                        this.nextStep();
                    }
                });
            } else if (this.active === 4) {
                this.$refs.formLocal.validate(async (valid) => {
                    if (valid) {
                        this.nextStep();
                        this.enivarFormulário();
                    }
                });
            }
        },
        nextStep() {
            if (this.active++ > 5) this.active = 0;
        },
        goBack() {
            this.$router.back();
        },
        async getFormularioEditavel() {
            try {
                this.loading = true;
                const data = await getOcorrenciasDetalhes(this.$route.params.uid);
                const ocorrencia = this.camelToSnake(data);
                this.updateOcorrencia = ocorrencia
                this.formOcorrencia = {
                    descricao: ocorrencia.descricao,
                    classificacao: ocorrencia.classificacao,
                    data_ocorrencia: ocorrencia.data_ocorrencia,
                    natureza_uid: ocorrencia.natureza_uid,
                    categoria_uid: ocorrencia.natureza_ocorrencium.categoria_ocorrencium.uid,
                }
                this.formPessoa = {
                    nome: ocorrencia.pessoa.nome,
                    rg: ocorrencia.pessoa.rg,
                    endereco: ocorrencia.pessoa.endereco,
                    genero: ocorrencia.pessoa.genero,
                }
                this.formVitima = {
                    email: ocorrencia?.pessoa?.vitima?.email,
                    data_nascimento: ocorrencia?.pessoa?.vitima?.data_nascimento,
                    telefone: ocorrencia?.pessoa?.vitima?.telefone,
                }
                this.formUniversidade = {
                    ...ocorrencia.pessoa.vinculo_universidade,
                }
                this.instrumento_portado = ocorrencia?.pessoa?.autor?.instrumento_portado;
                this.objeto = ocorrencia?.item_subtraido?.objeto;
                this.formLocal = {
                    local: ocorrencia.local,
                    latitude: ocorrencia.latitude,
                    longitude: ocorrencia.longitude,
                }
                this.markers = [{
                    id: this.nextMarkerId++,
                    latLng: [ocorrencia.latitude, ocorrencia.longitude],
                }]
            } catch (error) {
                console.error(error)
                this.$notify({
                    title: 'Falha ao acessar a ocorrência',
                    message: error?.response?.data?.message || '',
                    type: 'error',
                });
                this.goBack();
            } finally {
                //
                this.loading = false;
            }
        },
        async atualizarOcorrencia() {
            try {
                this.loading = true;
                const payload = this.makeAtualizarOcorrenciaPayload();
                const { uid } = this.$route.params;
                await pacthUpdateRegistroOcorrencia(uid, payload);
                this.$notify({
                    title: 'Sucesso!',
                    message: 'Registro atualizado com sucesso',
                    type: 'success',
                });
                this.goBack();
            } catch (error) {
                console.error(error)
                this.$notify({
                    title: 'Falha ao atualizar a ocorrência',
                    message: error?.response?.data?.message || '',
                    type: 'error',
                });
                this.erros = error?.response?.data?.erros || [];
            } finally {
                this.loading = false;
            }
        },
        async enivarFormulário() {
            try {
                this.loading = true;
                this.erros = [];
                const vinculoUniversidade = this.makeVinculoUniversidadePayload();
                // const universidade = await postCriarVinculoUniversidade(vinculoUniversidade);

                const payloadPessoa = this.makePessoaPayload('');
                // const pessoa = await postCriarPessoa(payloadPessoa);
                // const item_subtraido = await postCriarItemSubtraido({ objeto: this.objeto ?? 'N/A' });

                const payloadOcorrencia = this.makeRegistroOcorrenciaPayload('', '');

                const payload = {
                    ...payloadOcorrencia,
                    ...payloadPessoa,
                    ...{ objeto: this.objeto ?? 'N/A' },
                    ...vinculoUniversidade,
                }

                const result = await postCriarRegistroOcorrencia(payload);
                // const result = await postCriarRegistroOcorrencia(payloadOcorrencia);

                this.ocorrenciaResult = result;
                this.active++
            } catch (error) {
                this.$notify({
                    title: 'Falha ao criar a ocorrência',
                    message: error?.response?.data?.message || 'Erro ao validar o formulário, revise os dados informados',
                    type: 'error',
                });
                this.active = 0;
                this.erros = error?.response?.data?.erros || [];
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
        async getDadosFormulario() {
            try {
                const categoria = await getCategoriaOcorrenciaDados();
                const natureza = await getNaturezaOcorrenciaDados();
                const vinculo = await getTiposVinculosUniversidade();
                this.naturezaOptions = natureza;
                this.categoriaOptions = categoria;
                this.vinculoOptions = vinculo;
            } catch (error) {
                console.error(error);
            }
        },
    },
}