<template>
    <div class="menu-lateral">
        <el-menu
            :default-active="activeRoute"
            background-color="#054050"
            text-color="#fff"
            class="el-menu-vertical-demo">
        <el-submenu index="registroOcorrencia">
            <template slot="title">
                <i class="el-icon-document"></i>
                <span>Registro Ocorrencia</span>
            </template>
            <el-menu-item-group title="Opções">
                <el-menu-item @click="goTo('RegistroOcorrenciaLisagem')" index="RegistroOcorrenciaLisagem">
                    <i class="el-icon-folder-opened"></i> <span> Listagem </span>
                </el-menu-item>            
                <el-menu-item @click="goTo('RegistroOcorrenciaMapas')" index="RegistroOcorrenciaMapas">
                    <i class="el-icon-map-location"></i> <span> Mapa </span>
                </el-menu-item>
                <el-menu-item @click="goTo('RegistroOcorrenciaCriar')" index="RegistroOcorrenciaCriar">
                    <i class="el-icon-document-add"></i> <span> Nova Ocorrência </span>
                </el-menu-item>
        </el-menu-item-group>
        </el-submenu>
        <el-menu-item @click="goTo('ListagemVitimas')" index="ListagemVitimas">
            <i class="el-icon-user"></i>
            <span>Listagem de Vitimas</span>
        </el-menu-item>
        <el-menu-item @click="goTo('ConfiguracaoPerfil')" index="ConfiguracaoPerfil">
            <i class="el-icon-setting"></i>
            <span>Configuração do Perfil</span>
        </el-menu-item>        
        <el-menu-item index="4">
            <i class="el-icon-switch-button"></i>
            <span>Sair</span>
        </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
  export default {
    methods: {
      goTo(name) {
      this.$router.push({ name })
     }
  },
  computed: {
    activeRoute() {
      let routeName = this.$route.name;
      if (routeName === 'RegistroOcorrenciaDetalhes') {
        // Ainda está na mesma categoria de menu
        routeName = 'registroOcorrencia';
      } else if (routeName === "RegistroOcorrenciaAtualizar") {
        routeName = 'registroOcorrencia'
      }
      return routeName;
      }
    }
  }
</script>
<style>
.menu-lateral {
    display: flex;
  position: fixed;
    height: 100%;
}
</style>