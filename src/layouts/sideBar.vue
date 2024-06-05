<template>
    <div class="menu-lateral">
        <el-menu
            :default-active="activeRoute"
            background-color="#054050"
            text-color="#fff"
            class="el-menu-vertical-demo"
        >
            <el-submenu index="registroOcorrencia">
                <template slot="title">
                    <i class="el-icon-document" />
                    <span>Registro Ocorrencia</span>
                </template>
                <el-menu-item-group title="Opções">
                    <el-menu-item
                        index="RegistroOcorrenciaMapas"
                        @click="goTo('RegistroOcorrenciaMapas')"
                    >
                        <i class="el-icon-s-data" /> <span> Painel de Controle </span>
                    </el-menu-item>
                    <el-menu-item
                        index="RegistroOcorrenciaLisagem"
                        @click="goTo('RegistroOcorrenciaLisagem')"
                    >
                        <i class="el-icon-folder-opened" /> <span> Listagem </span>
                    </el-menu-item>
                    <el-menu-item
                        index="RegistroOcorrenciaCriar"
                        @click="goTo('RegistroOcorrenciaCriar')"
                    >
                        <i class="el-icon-document-add" /> <span> Nova Ocorrência </span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <!-- <el-menu-item
                index="ListagemVitimas"
                @click="goTo('ListagemVitimas')"
            >
                <i class="el-icon-user" />
                <span>Listagem de Vitimas</span>
            </el-menu-item>
            <el-menu-item
                index="ConfiguracaoPerfil"
                @click="goTo('ConfiguracaoPerfil')"
            >
                <i class="el-icon-setting" />
                <span>Configuração do Perfil</span>
            </el-menu-item> -->
            <el-menu-item index="4">
                <i class="el-icon-switch-button" />
                <span>Sair</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
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
        },
    },
    methods: {
        goTo(name) {
            this.$router.push({ name })
        },
    },
}
</script>
<style>
.menu-lateral {
    display: flex;
    position: fixed;
    height: 100%;
}
</style>