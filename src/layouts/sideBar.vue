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
                        v-if="hasUser.usuarioTipo === 1"
                        index="RegistroOcorrenciaDashboard"
                        @click="goTo('RegistroOcorrenciaDashboard')"
                    >
                        <i class="el-icon-s-data" /> <span> Painel de Controle </span>
                    </el-menu-item>
                    <el-menu-item
                        v-if="hasUser.usuarioTipo === 1"
                        index="RegistroOcorrenciaLisagem"
                        @click="goTo('RegistroOcorrenciaLisagem')"
                    >
                        <i class="el-icon-folder-opened" /> <span> Listagem </span>
                    </el-menu-item>
                    <el-menu-item
                        index="BuscaProtocolo"
                        @click="goTo('BuscaProtocolo')"
                    >
                        <i class="el-icon-search" /> <span> Pesquisar Ocorrência </span>
                    </el-menu-item>
                    <el-menu-item
                        index="RegistroOcorrenciaCriar"
                        @click="goTo('RegistroOcorrenciaCriar')"
                    >
                        <i class="el-icon-document-add" /> <span> Nova Ocorrência </span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item
                index="4"
                @click="logout"
            >
                <i class="el-icon-switch-button" />
                <span>Sair</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
import { logoutUser } from "../services/users"
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
        hasUser() {
            const hasUser = JSON.parse(sessionStorage.getItem("user"))
            return hasUser;
        },
    },
    methods: {
        goTo(name) {
            this.$router.push({ name })
        },
        async logout() {
            try {
                await logoutUser();
                sessionStorage.removeItem("user");
                this.$router.push({ name: "login" })
            } catch (error) {
                console.error(error)
            }
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