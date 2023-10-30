<template>
    <div>
        <el-card class="filter-card">
            <el-skeleton v-if="loading" animated :rows="20" />
            <div v-else>
                <el-page-header @back="goBack" content="Detalhes do Registro da Ocorrência"></el-page-header>
                    
                    <div class="p-8">
                    <template v-if="user.usuarioTipo === 1 && !disebledBtn">
                        <h2 class="text-2xl font-semibold">Ações da Ocorrência</h2>
                        <div class="flex gap-3 mb-5 mt-5">
                            <el-button :loading="loadingBtn" size="small" type="success" @click="mudarStatus('Processando')">Encaminhar Ocorrência</el-button>
                            <el-button :loading="loadingBtn" size="small" type="primary" @click="editarOcorrencia()">Editar Ocorrência</el-button>
                            <el-button :loading="loadingBtn" size="small" type="danger" @click="mudarStatus('Denúncia não confirmada')">Cancelar Ocorrência</el-button>
                        </div>
                        <el-divider></el-divider>
                    </template>
                    <!-- Informações da Ocorrência -->
                        <h2 class="text-2xl font-semibold">Informações da Ocorrência</h2>
                            <div class=" p-4 ">
                                <h2 class="text-2xl font-semibold">Protocolo: {{ ocorrencia.protocolo }}</h2>
                                <div class="mb-4">{{ ocorrencia.descricao }}</div>
                                    <div class="mb-4">
                                        <strong>Classificação:</strong> {{ ocorrencia.classificacao }}
                                    </div>
                                <div class="mb-4">
                                    <strong>Status:</strong> {{ ocorrencia.status }}
                                </div>                       
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
                                    <div id="map" style="height: 400px;z-index: 0;"></div>
                                </div>
                            </div>
                            <el-divider></el-divider>
                                <!-- Informações da Cadastrais da Vitima -->
                            <h2 class="text-2xl font-semibold">Informações Cadastrais da Vitima</h2>
                            <div class="p-4">   
                            <div class="p-4">
                                <div class="mb-4">
                                    <strong>Nome:</strong> {{ ocorrencia.pessoa.nome }}
                                </div>
                                <div class="mb-4">
                                    <strong>RG:</strong> {{ ocorrencia.pessoa.rg }}
                                </div>
                                <div class="mb-4">
                                    <strong>Endereço:</strong> {{ ocorrencia.pessoa.endereco }}
                                </div>
                                <div class="mb-4">
                                    <strong>Gênero:</strong> {{ ocorrencia.pessoa.genero }}
                                </div>
                            </div>
                            <el-divider></el-divider>
                            <!-- Informações da Vítima -->
                            <h2 class="text-2xl font-semibold">Informações da Vítima</h2>
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
                                <div v-show="ocorrencia.pessoa.autor" class="mb-4">
                                    <strong>Instrumento portado do Autor:</strong> {{ ocorrencia.pessoa.autor.instrumentoPortado }}
                                </div>
                            </div>
                            <el-divider></el-divider>
                                <!-- Informações do Vínculo com a Universidade -->
                            <h2 class="text-2xl font-semibold">Informações do Vínculo com a Universidade</h2>
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
import { getOcorrenciasDetalhes, pacthStatusRegistroOcorrencia } from "@/services/ocorrencia";
export default {
    name: "RegistroOcorrenciaDetalhesIndex",
    data() {
        return {
            loading: false,
            ocorrencia: {
        
            },
            user : {},
            loadingBtn :false
        };
    },
    async created() {
        await this.getDados();
        this.montarMapa();
        const user = JSON.parse(sessionStorage.getItem("user"));
        this.user = user;
    },
    computed: {
        disebledBtn() {
            return this.ocorrencia.status === 'Processando' || this.ocorrencia.status === 'Denúncia não confirmada';
        }
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
                    type: 'error'
                });
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
        async mudarStatus(status) {
            try {
                this.loadingBtn = true;
                await pacthStatusRegistroOcorrencia(this.ocorrencia.uid, status);
                this.$notify({
                    title: 'Sucesso!',
                    message: 'Status atualizado com sucesso',
                    type: 'success'
                });
            } catch (error) {
                console.error(error);
                this.$notify({
                    title: 'Falha ao atualizar o status',
                    message: error?.response?.data?.message || '',
                    type: 'error'
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

            L.marker([this.ocorrencia.latitude, this.ocorrencia.longitude],{ icon: customIcon })
            .addTo(map)
            .bindPopup('Localização relativa da Ocorrência')
            .openPopup();
        },
       formatarData(data) {
            const dataObj = new Date(data);
            return dataObj.toLocaleDateString();
        },
    },
};
</script>

<style scoped>
.filter-card {
    margin-bottom: 20px;
}
</style>
