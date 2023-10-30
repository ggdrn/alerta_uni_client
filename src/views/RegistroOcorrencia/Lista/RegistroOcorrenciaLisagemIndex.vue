<template>
  <div>
    <!-- Card de filtro -->
    <el-card class="filter-card">
      <el-form :model="filterForm" ref="filterForm" inline>
        <el-form-item label="Protocolo">
          <el-input v-model="filterForm.protocolo"></el-input>
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="filterForm.status" placeholder="Selecione">
            <el-option label="Todos" value=""></el-option>
            <el-option label="Aberta" value="aberta"></el-option>
            <el-option label="Processando" value="processando"></el-option>
            <el-option label="Denúncia não confirmada" value="Denúncia não confirmada"></el-option>
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
                end-placeholder="Fim">
            </el-date-picker>
        </el-form-item>
        <el-button :loading="loading" @click="getDados" type="success">Filtrar</el-button>
      </el-form>
    </el-card>

    <!-- Tabela de dados -->
    <el-table :lazy="loading" :data="ocorrencias.data" style="width: 100%">
      <el-table-column prop="protocolo" label="Protocolo"></el-table-column>
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
      <el-table-column prop="status" label="Status"></el-table-column>
      <el-table-column label="Data da Ocorrência">
        <template slot-scope="scope">
            {{ formatarData(scope.row.dataOcorrencia) }}
        </template>
      </el-table-column>
      <el-table-column label="Ação">
        <template slot-scope="scope">
          <el-button plain round type="success" @click="detalhesOcorrencia(scope.row)">Detalhes</el-button>
        </template>
      </el-table-column>
    </el-table>
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
            data_ocorrencia: ""
        },
          ocorrencias: {
            data: [], totalRegistros: 0, paginaAtual: 1
        }
    };
    },
    created() {
        this.getDados();
  },
  computed: {

  },
    methods: {
        async getDados() {
            try {
                this.loading = true;
                const result = await getOcorrenciasListagem(this.makeParams());
                this.ocorrencias = result;
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
        makeParams() {
            if (this.filterForm.data_ocorrencia?.length) {
                const data_inicial = new Date(this.filterForm.data_ocorrencia[0]);
                const data_final = new Date(this.filterForm.data_ocorrencia[1]);
                return {
                    protocolo: this.filterForm.protocolo,
                    status: this.filterForm.status,
                    data_ocorrencia: {data_inicial, data_final  }
                } 
            } else {
                 return {
                    protocolo: this.filterForm.protocolo,
                    status: this.filterForm.status,
                } 
            }
            
        },
        formatarData(date) {
            const { format } = require("date-fns");
            return format(new Date(date), "dd/MM/yyyy");
        },
        detalhesOcorrencia({ uid }) {
          // Implemente a lógica para exibir detalhes da ocorrência
          this.$router.push({ name: 'RegistroOcorrenciaDetalhes', params: { uid } });
        }
  }
};
</script>

<style scoped>
.filter-card {
  margin-bottom: 20px;
}
</style>