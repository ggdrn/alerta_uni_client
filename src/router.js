import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            component: () => import("./layouts/default"),
            meta: { requireAuth: true, isAdmin: true }, // validação de autenticação
            children: [
                {
                    path: '/registro-ocorrencia/listagem',
                    name: 'RegistroOcorrenciaLisagem',
                    component: () => import('@/views/RegistroOcorrencia/Lista/RegistroOcorrenciaLisagemIndex'),
                },

                {
                    path: '/registro-ocorrencia/dashboard',
                    name: 'RegistroOcorrenciaDashboard',
                    component: () => import('@/views/RegistroOcorrencia/Mapas/RegistroOcorrenciaDashboardIndex'),
                },

                {
                    path: '/registro-ocorrencia/editar/:uid',
                    name: 'RegistroOcorrenciaAtualizar',
                    component: () => import('@/views/RegistroOcorrencia/Criar/RegistroOcorrenciaCriarIndex'),
                },

            ],
        },
        {
            path: "/",
            component: () => import("./layouts/default"),
            meta: { requireAuth: true, isAdmin: false }, // validação de autenticação
            children: [

                {
                    path: '/registro-ocorrencia/criar',
                    name: 'RegistroOcorrenciaCriar',
                    component: () => import('@/views/RegistroOcorrencia/Criar/RegistroOcorrenciaCriarIndex'),
                },
                {
                    path: '/registro-ocorrencia/detalhes/:uid',
                    name: 'RegistroOcorrenciaDetalhes',
                    component: () => import('@/views/RegistroOcorrencia/Detalhes/RegistroOcorrenciaDetalhesIndex'),
                },
                {
                    path: '/registro-ocorrencia/protocolo',
                    name: 'BuscaProtocolo',
                    component: () => import('@/views/BuscaProtocolo/BuscaProtocolo'),
                },

            ],
        },
        {
            path: "/login",
            component: () => import("@/layouts/unauthenticate.vue"),
            children: [
                {
                    path: "/",
                    name: "login",
                    component: () => import("@/views/Login/LoginIndex"),
                },
            ],
        },
        {
            path: "*",
            name: "not-found",
            component: () => import("@/views/404.vue"),
        },
    ],
});

router.beforeEach(async (to, from, next) => {
    const hasUser = JSON.parse(sessionStorage.getItem("user")) || false;
    if (to.matched.some(record => record.meta.requireAuth)) {
        if (hasUser) {
            if (to.matched.some(record => record.meta.isAdmin) && hasUser.usuarioTipo === 1) {
                next();
            } else {
                if (!to.matched.some(record => record.meta.isAdmin)) {
                    next();
                } else {
                    next("/registro-ocorrencia/protocolo");
                }
            }
            next();

        } else {
            next("/login");
        }
    } else {
        next();
    }
});
export default router;