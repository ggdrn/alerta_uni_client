<template>
  <div>
     <el-card class="filter-card">
        <h2 class="text-2xl font-semibold mb-5">Registro Ocorrência - Visualização em Mapas</h2>
        <el-dialog
            :title="`Ocorrência: ${detalhe.protocolo}`"
            :visible.sync="dialogVisible"
            width="30%">
            <span>Deseja ver os detalhes dessa ocorrência?</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="success" @click="goTo">Confirm</el-button>
            </span>
        </el-dialog>    
        <div class="flex justify-center" v-if="loading">
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
                    <l-tile-layer :url="tileLayerUrl"></l-tile-layer>

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
    </div>
</template>

<script>
import { getOcorrenciasListagem } from "@/services/ocorrencia";
export default {
    name: "RegistroOcorrenciaMapasIndex",
    data:() => ({
        loading: false,
            detalhe: {},
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
            console.log('aquiiii')
            this.loading = true;
            const { data } =await getOcorrenciasListagem();
              this.locations = data.map(item => ({ location: [item.latitude, item.longitude], uid: item.uid, protocolo: item.protocolo }))
        } catch (error) {
            console.error(error);
        } finally {
            this.loading = false;
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