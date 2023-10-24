<template>
    <!-- Menu Lateral -->
   <el-aside>
      <el-menu default-active="1" :default-openeds="['registro-ocorrencia']">
       
        <el-submenu index="registro-ocorrencia">
          <template slot="title">Registro Ocorrência</template>
          <el-menu-item index="listagem">Listagem</el-menu-item>
          <el-menu-item index="criar">Criar</el-menu-item>
        </el-submenu>
        <el-menu-item index="perfil">Perfil</el-menu-item>
        <el-menu-item index="vitimas">Vítimas</el-menu-item>
      </el-menu>
    </el-aside>
</template>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style>
.el-aside {
    width: 200px;
}
</style>