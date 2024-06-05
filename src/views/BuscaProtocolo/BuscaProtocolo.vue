<template>
    <div class="flex items-center justify-center">
        <div class="max-w-md rounded overflow-hidden shadow-lg bg-white">
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">
                    Buscar Ocorrência a partir do protocolo
                </div>
                <div class="flex items-center gap-2">
                    <input
                        v-model="protocolo"
                        type="text"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Digite o protocolo"
                    >
                    <el-button
                        type="primary"
                        :loading="loading"
                        @click="pesquisarOcorrencia"
                    >
                        Pesquisar
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

  <script>
import { getOcorrenciasDetalhes } from "@/services/ocorrencia";
export default {
    name: "BuscaProtocolo",
    data() {
        return {
            protocolo: "",
            loading: false,
        };
    },
    methods: {
        async pesquisarOcorrencia() {
            try {
                this.loading = true;
                // Implemente a lógica para pesquisar a ocorrência
                // usando o valor do protocolo.
                const data = await getOcorrenciasDetalhes('', { protocolo: this.protocolo });
                if (data) {
                    // Implemente a lógica para exibir detalhes da ocorrência
                    this.$router.push({ name: 'RegistroOcorrenciaDetalhes', params: { uid: data.uid } });

                } else {
                    this.$notify({
                        title: 'Não foi possível encontrar a ocorrência',
                        message: '',
                        type: 'error',
                    });
                }
            } catch (error) {
                console.error(error);
                this.$notify({
                    title: 'Não foi possível encontrar a ocorrência',
                    message: '',
                    type: 'error',
                });
            } finally {
                this.loading = false;
            }
        },
    },
};
  </script>>