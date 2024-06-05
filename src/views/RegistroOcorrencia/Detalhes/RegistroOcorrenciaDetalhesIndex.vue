<template>
    <div>
        <!-- Modal para Troca de Status -->
        <el-dialog
            title="Troca de Status"
            :visible.sync="modalVisivel"
            width="55%"
        >
            <el-form
                ref="formTrocaStatus"
                :model="formTrocaStatus"
                :rules="formTrocaRules"
                label-width="120px"
            >
                <el-form-item
                    label="Status Antigo:"
                >
                    <el-select
                        v-model="formTrocaStatus.statusAntigo"
                        disabled
                    />
                </el-form-item>
                <el-form-item
                    prop="novoStatus"
                    label="Novo Status:"
                >
                    <el-select
                        v-model="formTrocaStatus.novoStatus"
                        placeholder="Selecione um status"
                    >
                        <el-option
                            label="Aberta"
                            value="aberta"
                            :disabled="ocorrencia.status === 'aberta'"
                        />
                        <el-option
                            label="Pendente"
                            value="pendente"
                            :disabled="ocorrencia.status === 'pendente'"
                        />
                        <el-option
                            label="Denúncia em Apuração"
                            value="apuracao"
                            :disabled="ocorrencia.status === 'apuracao'"
                        />
                        <el-option
                            label="Encerrada"
                            :disabled="ocorrencia.status === 'encerrada'"
                            value="encerrada"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="Justificativa:">
                    <el-input
                        v-model="formTrocaStatus.justificativa"
                        type="textarea"
                        placeholder="Informe a justificativa para a troca de status"
                        :rows="4"
                        :autosize="{ minRows: 4, maxRows: 8 }"
                        required
                    />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button
                    size="small"
                    :disabled="loadingBtn"
                    @click="cancelarTrocaStatus"
                >
                    Cancelar
                </el-button>
                <el-button
                    type="primary"
                    size="small"
                    :loading="loadingBtn"
                    @click="confirmarTrocaStatus"
                >
                    Confirmar
                </el-button>
            </template>
        </el-dialog>
        <el-card class="filter-card">
            <el-skeleton
                v-if="loading"
                animated
                :rows="20"
            />
            <div v-else>
                <el-page-header
                    content="Detalhes do Registro da Ocorrência"
                    @back="goBack"
                />

                <div class="p-8">
                    <template v-if="user.usuarioTipo === 1 && !disebledBtn">
                        <h2 class="text-2xl font-semibold">
                            Ações da Ocorrência
                        </h2>
                        <div class="flex gap-3 mb-5 mt-5">
                            <el-button
                                :loading="loadingBtn"
                                size="small"
                                type="primary"
                                @click="editarOcorrencia()"
                            >
                                Editar Ocorrência
                            </el-button>
                            <el-button
                                type="primary"
                                :loading="loadingBtn"
                                size="small"
                                @click="abrirModalTrocaStatus(ocorrencia)"
                            >
                                Alterar Status
                            </el-button>
                        </div>
                        <el-divider />
                    </template>
                    <!-- Informações da Ocorrência -->
                    <h2 class="text-2xl font-semibold">
                        Informações da Ocorrência
                    </h2>
                    <div class=" p-4 ">
                        <h2 class="text-2xl font-semibold">
                            Protocolo: {{ ocorrencia.protocolo }}
                        </h2>
                        <div class="mb-4">
                            {{ ocorrencia.descricao }}
                        </div>
                        <div class="mb-4">
                            <strong>Classificação:</strong> {{ ocorrencia.classificacao }}
                        </div>
                        <div class="mb-4">
                            <strong>Status:</strong> {{ ocorrencia.statusExibicao }}
                        </div>

                        <el-timeline
                            class="mt-3 mb-6 pl-7"
                        >
                            <el-timeline-item
                                v-for="(item, index) in historicoStatus"
                                :key="index"
                                :timestamp="formatarData(item.createdAt)"
                                placement="top"
                            >
                                <el-card>
                                    <div class="flex items-center gap-4">
                                        <div class="flex items-center gap-2">
                                            <span class="text-gray-500">{{ item.statusAntigoExibicao }}</span>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <el-icon
                                                class="text-gray-400 el-icon-right"
                                                :size="20"
                                            />
                                            <span class="text-gray-500">{{ item.statusNovoExibicao }}</span>
                                        </div>
                                    </div>
                                    <div v-show="item.justificativa">
                                        <span class="text-gray-600 font-bold">Justificativa:</span>
                                        <span class="text-gray-500"> {{ item.justificativa }}</span>
                                    </div>
                                </el-card>
                            </el-timeline-item>
                        </el-timeline>

                        <div class="mb-4">
                            <strong>Categoria da Ocorrência:</strong> {{ ocorrencia.naturezaOcorrencium.categoriaOcorrencium.nome }}
                        </div>
                        <div class="mb-4">
                            <strong>Natureza da Ocorrência:</strong> {{ ocorrencia.naturezaOcorrencium.nome }}
                        </div>
                        <div class="mb-4">
                            <strong>Data da Ocorrência:</strong> {{ formatarData(ocorrencia.dataOcorrencia) }}
                        </div>
                        <div class="mb-4">
                            <strong>Local:</strong> {{ ocorrencia.local }}
                        </div>
                        <div class="mb-4">
                            <strong>Coordenadas:</strong> Latitude: {{ ocorrencia.latitude }}, Longitude: {{ ocorrencia.longitude }}
                        </div>
                        <div class="mb-4">
                            <div
                                id="map"
                                style="height: 400px;z-index: 0;"
                            />
                        </div>
                    </div>
                    <el-divider />
                    <!-- Informações da Cadastrais da Vitima -->
                    <h2 class="text-2xl font-semibold">
                        Informações Cadastrais da Vitima
                    </h2>
                    <div class="p-4">
                        <div class="p-4">
                            <div class="mb-4">
                                <strong>Nome:</strong> {{ ocorrencia.pessoa.nome }}
                            </div>
                            <div class="mb-4">
                                <strong>CPF:</strong> {{ ocorrencia.pessoa.rg }}
                            </div>
                            <div class="mb-4">
                                <strong>Endereço:</strong> {{ ocorrencia.pessoa.endereco }}
                            </div>
                            <div class="mb-4">
                                <strong>Gênero:</strong> {{ ocorrencia.pessoa.genero }}
                            </div>
                        </div>
                        <el-divider />
                        <!-- Informações da Vítima -->
                        <h2 class="text-2xl font-semibold">
                            Informações da Vítima
                        </h2>
                        <div class="p-4">
                            <div class="mb-4">
                                <strong>E-mail:</strong> {{ ocorrencia.pessoa.vitima.email }}
                            </div>
                            <div class="mb-4">
                                <strong>Data de Nascimento:</strong> {{ formatarData(ocorrencia.pessoa.vitima.dataNascimento) }}
                            </div>
                            <div class="mb-4">
                                <strong>Telefone:</strong> {{ ocorrencia.pessoa.vitima.telefone }}
                            </div>
                            <div
                                v-show="ocorrencia.pessoa.autor"
                                class="mb-4"
                            >
                                <strong>Instrumento portado do Autor:</strong> {{ ocorrencia.pessoa?.autor?.instrumentoPortado }}
                            </div>
                            <div
                                v-show="ocorrencia.itemSubtraido?.objeto"
                                class="mb-4"
                            >
                                <strong>Item subtraído:</strong> {{ ocorrencia.itemSubtraido?.objeto }}
                            </div>
                        </div>
                        <el-divider />
                        <!-- Informações do Vínculo com a Universidade -->
                        <h2 class="text-2xl font-semibold">
                            Informações do Vínculo com a Universidade
                        </h2>
                        <div class="p-4">
                            <div class="mb-4">
                                <strong>Curso:</strong> {{ ocorrencia.pessoa.vinculoUniversidade.curso }}
                            </div>
                            <div class="mb-4">
                                <strong>Departamento:</strong> {{ ocorrencia.pessoa.vinculoUniversidade.departamento }}
                            </div>
                            <div class="mb-4">
                                <strong>Matrícula:</strong> {{ ocorrencia.pessoa.vinculoUniversidade.matricula }}
                            </div>
                            <div class="mb-4">
                                <strong>Tipo:</strong> {{ ocorrencia.pessoa.vinculoUniversidade.vinculoUniversidade.titulo }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from '@/assets/marker.png'; // Substitua pelo caminho da sua imagem
import { getOcorrenciasDetalhes, pacthStatusRegistroOcorrencia, getStatusRegistroOcorrencia } from "@/services/ocorrencia";
const requerido = { required: true, message: "Informe o valor correto", trigger: "blur" };
export default {
    name: "RegistroOcorrenciaDetalhesIndex",
    data() {
        return {
            loading: false,
            ocorrencia: {

            },
            user: {},
            historicoStatus: [],
            loadingBtn: false,
            loadingStatus: false,
            modalVisivel: false,
            formTrocaStatus: {
                statusAntigo: "",
                novoStatus: "",
                justificativa: "",
            },
            formTrocaRules: {
                statusAntigo: [requerido],
                novoStatus: [requerido],
                justificativa: [requerido],
            },
        };
    },
    computed: {
        disebledBtn() {
            return this.ocorrencia.status === 'Processando' || this.ocorrencia.status === 'Denúncia não confirmada';
        },
    },
    async created() {
        await this.getDados();
        await this.getHistoricoStatus();
        this.montarMapa();
        const user = JSON.parse(sessionStorage.getItem("user"));
        this.user = user;
    },
    methods: {
        goBack() {
            this.$router.back();
        },
        editarOcorrencia() {
            this.$router.push({ name: 'RegistroOcorrenciaAtualizar', params: { uid: this.ocorrencia.uid } });
        },
        async getDados() {
            try {
                this.loading = true;
                const { uid } = this.$route.params;
                const result = await getOcorrenciasDetalhes(uid);
                this.ocorrencia = result;
            } catch (error) {
                this.$router.push({ name: "RegistroOcorrenciaLisagem" });
                this.$notify({
                    title: 'Falha ao acessar a Ocorrência',
                    message: 'Não foi possível vizualizar os detalhes dessa Ocorrência',
                    type: 'error',
                });
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
        async mudarStatus() {
            try {
                this.loadingBtn = true;
                const payload = {
                    status_antigo: this.ocorrencia.status,
                    status_novo: this.formTrocaStatus.novoStatus,
                    justificativa: this.formTrocaStatus.justificativa,
                }
                await pacthStatusRegistroOcorrencia(this.ocorrencia.uid, payload);
                this.$notify({
                    title: 'Sucesso!',
                    message: 'Status atualizado com sucesso',
                    type: 'success',
                });
                this.getDados();
                this.getHistoricoStatus();
            } catch (error) {
                console.error(error);
                this.$notify({
                    title: 'Falha ao atualizar o status',
                    message: error?.response?.data?.message || '',
                    type: 'error',
                });
            } finally {
                this.loadingBtn = false;
                this.getDados();
            }
        },
        montarMapa() {
            const map = L.map('map').setView([this.ocorrencia.latitude, this.ocorrencia.longitude], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);

            const customIcon = L.icon({
                iconUrl: markerIcon, // Use a imagem personalizada como ícone
                iconSize: [32, 32], // Defina o tamanho do ícone personalizado
            });

            L.marker([this.ocorrencia.latitude, this.ocorrencia.longitude], { icon: customIcon })
                .addTo(map)
                .bindPopup('Localização relativa da Ocorrência')
                .openPopup();
        },
        formatarData(data) {
            const dataObj = new Date(data);
            return dataObj.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false, // Formato 24 horas
            });
        },
        abrirModalTrocaStatus(ocorrencia) {
            this.modalVisivel = true;
            this.formTrocaStatus.statusAntigo = ocorrencia.statusExibicao;
            this.formTrocaStatus.novoStatus = ''; // Inicie com o status atual
        },
        cancelarTrocaStatus() {
            this.modalVisivel = false;
            this.$refs.formTrocaStatus.resetFields();
        },
        async confirmarTrocaStatus() {
            // Validação do formulário
            this.$refs.formTrocaStatus.validate(async (valid) => {
                if (valid) {
                    await this.mudarStatus();
                    this.modalVisivel = false;
                }
            });
        },
        async getHistoricoStatus() {
            try {
                this.loading = true;
                const { uid } = this.$route.params;
                const { data } = await getStatusRegistroOcorrencia(uid);
                this.historicoStatus = data;
            } catch (error) {
                this.$notify({
                    title: 'Falha ao acessar o histórico de status',
                    message: 'Não foi possível vizualizar os detalhes do histórico do status',
                    type: 'error',
                });
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>

<style scoped>
.filter-card {
    margin-bottom: 20px;
}
</style>
