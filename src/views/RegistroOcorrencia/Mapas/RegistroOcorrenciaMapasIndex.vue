<!-- eslint-disable vue/custom-event-name-casing -->
<template>
    <div>
        <!-- Card de filtro -->
        <el-card class="filter-card mb-5">
            <el-form
                ref="filterForm"
                :model="filterForm"
                inline
            >
                <el-form-item label="Protocolo">
                    <el-input v-model="filterForm.protocolo" />
                </el-form-item>
                <el-form-item label="Status">
                    <el-select
                        v-model="filterForm.status"
                        placeholder="Selecione"
                    >
                        <el-option
                            label="Todos"
                            value=""
                        />
                        <el-option
                            label="Aberta"
                            value="aberta"
                        />
                        <el-option
                            label="Pendente"
                            value="pendente"
                        />
                        <el-option
                            label="Denúncia em Apuração"
                            value="apuracao"
                        />
                        <el-option
                            label="Encerrada"
                            value="encerrada"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="Data">
                    <el-date-picker
                        v-model="filterForm.data_ocorrencia"
                        type="daterange"
                        range-separator="e"
                        start-placeholder="Inicio"
                        value-format="yyyy-MM-dd"
                        placeholder="Selecione a data"
                        format="dd/MM/yyyy"
                        end-placeholder="Fim"
                    />
                </el-form-item>
                <el-button
                    :loading="loading"
                    type="success"
                    @click="getDados"
                >
                    Filtrar
                </el-button>
            </el-form>
        </el-card>
        <el-card class="filter-card">
            <h2 class="text-2xl font-semibold mb-5">
                Registro Ocorrência - Visualização em Mapas
            </h2>
            <el-dialog
                :title="`Ocorrência: ${detalhe.protocolo}`"
                :visible.sync="dialogVisible"
                width="30%"
            >
                <span>Deseja ver os detalhes dessa ocorrência?</span>
                <span
                    slot="footer"
                    class="dialog-footer"
                >
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button
                        type="success"
                        @click="goTo"
                    >Confirm</el-button>
                </span>
            </el-dialog>
            <div
                v-if="loading"
                class="flex justify-center"
            >
                Carregando Mapas
            </div>
            <div v-else>
                <!-- Div que conterá o mapa -->
                <l-map
                    style="height: 500px"
                    :zoom="zoom"
                    :center="center"
                >
                    <!-- Defina um tile layer, por exemplo, o OpenStreetMap -->
                    <l-tile-layer :url="tileLayerUrl" />

                    <!-- Use v-for para adicionar marcadores a partir do array de coordenadas -->
                    <l-marker
                        v-for="(ocorrencia, index) in locations"
                        :key="index"
                        :lat-lng="ocorrencia.location"
                        @click="markerClicked(ocorrencia)"
                    >
                        <l-popup>{{ ocorrencia.protocolo }}</l-popup>
                    </l-marker>
                </l-map>
            </div>
        </el-card>
        <el-pagination
            class="mt-4 mb-4"
            :current-page.sync="pagination.page"
            :page-size.sync="pagination.perPage"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.totalRegistros"
            @size-change="getDados"
            @current-change="getDados"
        />
    </div>
</template>

<script>
import { getOcorrenciasListagem } from "@/services/ocorrencia";
export default {
    name: "RegistroOcorrenciaMapasIndex",
    data: () => ({
        loading: false,
        detalhe: {},
        filterForm: {
            protocolo: "",
            status: "",
            data_ocorrencia: "",
        },
        pagination: {
            totalRegistros: 0,
            perPage: 20,
            page: 1,
        },
        dialogVisible: false,
        zoom: 12, // Nível de zoom inicial
        center: [-22.7796, -43.7105], // Coordenadas iniciais do mapa
        tileLayerUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', // URL do tile layer (OpenStreetMap)

        // Seus dados de localização, substitua com seu array de coordenadas
        locations: [
            // Adicione suas coordenadas aqui
        ],
    }),
    created() {
        this.getDados();
    },
    methods: {
        async getDados() {
            try {
                this.loading = true;
                const { data,
                        page,
                        perPage,
                        totalRegistros } = await getOcorrenciasListagem(this.makeParams());
                this.locations = data.map(item => ({ location: [item.latitude, item.longitude], uid: item.uid, protocolo: item.protocolo }))
                this.pagination = {  page,
                                     perPage,
                                     totalRegistros }
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
        makeParams() {
            let params = {};
            if (this.filterForm.data_ocorrencia?.length) {
                const data_inicial = new Date(this.filterForm.data_ocorrencia[0]);
                const data_final = new Date(this.filterForm.data_ocorrencia[1]);
                params =  {
                    ...params,
                    protocolo: this.filterForm.protocolo,
                    status: this.filterForm.status,
                    data_ocorrencia: { data_inicial, data_final  },
                }
            } else {
                params = {
                    ...params,
                    protocolo: this.filterForm.protocolo,
                    status: this.filterForm.status,

                }
            }
            return params = {
                ...params,
                perPage: this.pagination.perPage,
                page: this.pagination.page,
            }

        },
        goTo() {
            this.$router.push({ name: 'RegistroOcorrenciaDetalhes', params: { uid: this.detalhe.uid } });
        },
        markerClicked(index) {
            this.detalhe = index;
            this.dialogVisible = true;
        },
    },
};
</script>

<style scoped>
/* Estilos Tailwind CSS podem ser aplicados aqui, se necessário */
</style>