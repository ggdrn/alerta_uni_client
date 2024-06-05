<template>
    <div>
        <!-- Card de filtro -->
        <el-card class="filter-card">
            <el-form
                ref="filterForm"
                :model="filterForm"
                inline
                :disabled="loading"
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

        <!-- Tabela de dados -->
        <el-table
            :lazy="loading"
            :data="ocorrencias.data"
            style="width: 100%"
        >
            <el-table-column
                prop="protocolo"
                label="Protocolo"
            />
            <el-table-column label="Categoria Ocorrência">
                <template slot-scope="scope">
                    {{ scope.row.naturezaOcorrencium.categoriaOcorrencium.nome }}
                </template>
            </el-table-column>
            <el-table-column label="Natureza Ocorrência">
                <template slot-scope="scope">
                    {{ scope.row.naturezaOcorrencium.nome }}
                </template>
            </el-table-column>
            <el-table-column
                prop="statusExibicao"
                label="Status"
            />
            <el-table-column label="Data da Ocorrência">
                <template slot-scope="scope">
                    {{ formatarData(scope.row.dataOcorrencia) }}
                </template>
            </el-table-column>
            <el-table-column label="Ação">
                <template slot-scope="scope">
                    <el-button
                        plain
                        round
                        type="success"
                        @click="detalhesOcorrencia(scope.row)"
                    >
                        Detalhes
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            class="mt-4 mb-4"
            :current-page.sync="ocorrencias.page"
            :page-size.sync="ocorrencias.perPage"
            layout="total, sizes, prev, pager, next, jumper"
            :total="ocorrencias.totalRegistros"
            @size-change="getDados"
            @current-change="getDados"
        />
    </div>
</template>

<script>
import { getOcorrenciasListagem } from "@/services/ocorrencia";
export default {
    name: "RegistroOcorrenciaLisagemIndex",
    data() {
        return {
            loading: false,
            filterForm: {
                protocolo: "",
                status: "",
                data_ocorrencia: "",
            },
            ocorrencias: {
                data: [], totalRegistros: 0, page: 1,
            },
        };
    },
    computed: {

    },
    created() {
        this.getDados();
    },
    methods: {
        async getDados() {
            try {
                this.loading = true;
                const result = await getOcorrenciasListagem(this.makeParams());
                this.ocorrencias = result;
            } catch (error) {
                console.error(error);
                this.ocorrencias = [];
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
                perPage: this.ocorrencias.perPage,
                page: this.ocorrencias.page,
            }

        },
        formatarData(date) {
            const { format } = require("date-fns");
            return format(new Date(date), "dd/MM/yyyy");
        },
        detalhesOcorrencia({ uid }) {
            // Implemente a lógica para exibir detalhes da ocorrência
            this.$router.push({ name: 'RegistroOcorrenciaDetalhes', params: { uid } });
        },
    },
};
</script>

<style scoped>
.filter-card {
  margin-bottom: 20px;
}
</style>