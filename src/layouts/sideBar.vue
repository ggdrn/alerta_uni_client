<template>
    <div class="menu-lateral">
        <el-menu
            default-active="1-1"
            background-color="#054050"
            text-color="#fff"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose">
        <el-submenu index="1">
            <template slot="title">
            <i class="el-icon-document"></i>
            <span>Registro Ocorrencia</span>
            </template>
            <el-menu-item-group title="Opções">
            <el-menu-item index="1-1">
                <i class="el-icon-folder-opened"></i> <span> Listagem </span>
            </el-menu-item>
            <el-menu-item index="1-2">
                <i class="el-icon-document-add"></i> <span> Nova Ocorrência </span>
            </el-menu-item>
        </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="2">
            <i class="el-icon-user"></i>
            <span>Listagem de Vitimas</span>
        </el-menu-item>
        <el-menu-item index="3">
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
.menu-lateral {
    display: flex;
  position: fixed;
    height: 100%;
}
</style>