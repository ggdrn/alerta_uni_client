import { getNaturezaOcorrenciaDados, getCategoriaOcorrenciaDados, getTiposVinculosUniversidade, postCriarItemSubtraido, postCriarRegistroOcorrencia, postCriarPessoa, postCriarVinculoUniversidade } from "@/services/ocorrencia";
export default {
    created() {
        this.getDadosFormulario();
    },
    computed: {
        naturezaOptionsFilter() {
            if (this.formOcorrencia.categoria_uid) {
                return this.naturezaOptions.filter(item => item.categoriaUid === this.formOcorrencia.categoria_uid)
            } else {
                return this.naturezaOptions;
            }

        }
    },
    methods: {
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
                ...this.formUniversidade
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
                pessoa_uid, item_uid
            }
        },
        addMarker(event) {
            const latLng = event.latlng;
            this.markers = [{
                id: this.nextMarkerId++,
                latLng: [latLng.lat, latLng.lng]
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
            }
            else if (this.active === 1) {
                this.$refs.formVitima.validate(async (valid) => {
                    if (valid) {
                        this.nextStep();
                    }
                });
            }
            else if (this.active === 2) {
                this.$refs.formOcorrencia.validate(async (valid) => {
                    if (valid) {
                        this.nextStep();
                    }
                });
            }
            else if (this.active === 3) {
                this.$refs.formUniversidade.validate(async (valid) => {
                    if (valid) {
                        this.nextStep();
                    }
                });
            }
            else if (this.active === 4) {
                this.$refs.formLocal.validate(async (valid) => {
                    if (valid) {
                        this.nextStep();
                    }
                });
            }
            else if (this.active === 5) {
                // faça a request aqui
                this.enivarFormulário();
            }
        },
        nextStep() {
            if (this.active++ > 5) this.active = 0;
        },
        async enivarFormulário() {
            try {
                this.loading = true;
                const vinculoUniversidade = this.makeVinculoUniversidadePayload();
                const universidade = await postCriarVinculoUniversidade(vinculoUniversidade);
                const payloadPessoa = this.makePessoaPayload(universidade.uid);
                const pessoa = await postCriarPessoa(payloadPessoa);
                const item_subtraido = await postCriarItemSubtraido({ objeto: this.objeto ?? 'N/A' });
                const payloadOcorrencia = this.makeRegistroOcorrenciaPayload(pessoa.uid, item_subtraido.uid);
                const result = await postCriarRegistroOcorrencia(payloadOcorrencia);
                this.ocorrenciaResult = result;
                this.active++
            } catch (error) {
                alert('Erro ao validar o formulário, revise os dados informados');
                this.active = 0;
                console.table(error);
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
        }
    }
}