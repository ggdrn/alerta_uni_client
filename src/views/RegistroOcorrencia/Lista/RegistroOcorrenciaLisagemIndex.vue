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
            <el-option label="Encerrado" value="encerrado"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Data">
          <el-date-picker
            v-model="filterForm.dataOcorrencia"
            type="date"
            format="dd/MM/yyyy"
            value-format="yyyy-MM-dd"
            placeholder="Selecione a data"
          ></el-date-picker>
        </el-form-item>
        <el-button :loading="loading" @click="getDados" type="primary">Filtrar</el-button>
      </el-form>
    </el-card>

    <!-- Tabela de dados -->
    <el-table :lazy="loading" :data="data" style="width: 100%">
      <el-table-column prop="protocolo" label="Protocolo"></el-table-column>
      <el-table-column prop="status" label="Status"></el-table-column>
      <el-table-column label="Data da Ocorrência">
        <template slot-scope="scope">
            {{ formatarData(scope.row.dataOcorrencia) }}
        </template>
      </el-table-column>
      <el-table-column label="Ação">
        <template slot-scope="scope">
          <el-button @click="editarOcorrencia(scope.row)">Editar</el-button>
          <el-button @click="detalhesOcorrencia(scope.row)">Detalhes</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {  getOcorrenciasListagem } from "@/services/ocorrencia"
export default {
name: "RegistroOcorrenciaLisagemIndex",
  data() {
      return {
        loading: false,
        filterForm: {
            protocolo: "",
            status: "",
            dataOcorrencia: ""
        },
        data: [
        ]
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
                const result = await getOcorrenciasListagem({ ...this.filterForm });
                this.data = result;
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
        formatarData(date) {
            const { format } = require("date-fns");
            return format(new Date(date), "dd/MM/yyyy");
        },
        filterData() {
            // Aplicar filtros aos dados aqui
            // Você pode fazer uma chamada à API para obter os dados filtrados
            console.log("Filtrar dados:", this.filterForm);
        },
        editarOcorrencia(row) {
            // Implemente a lógica para editar a ocorrência
            console.log("Editar ocorrência:", row);
        },
        detalhesOcorrencia(row) {
            // Implemente a lógica para exibir detalhes da ocorrência
            console.log("Detalhes da ocorrência:", row);
        }
  }
};
</script>

<style scoped>
.filter-card {
  margin-bottom: 20px;
}
</style>