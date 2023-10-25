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
            meta: { requireAuth: true }, // validação de autenticação
            children: [
                {
                    path: '/registro-ocorrencia/listagem',
                    name: 'RegistroOcorrenciaLisagem',
                    component: () => import('@/views/RegistroOcorrencia/Lista/RegistroOcorrenciaLisagemIndex'),
                },
                {
                    path: '/registro-ocorrencia/detalhes/:uid',
                    name: 'RegistroOcorrenciaDetalhes',
                    component: () => import('@/views/RegistroOcorrencia/Detalhes/RegistroOcorrenciaDetalhesIndex'),
                },

            ]
        },
        {
            path: "/login",
            component: () => import("@/layouts/unauthenticate.vue"),
            children: [
                {
                    path: "/",
                    name: "login",
                    component: () => import("@/views/Login/LoginIndex")
                }
            ]
        },
        {
            path: "*",
            name: "not-found",
            component: () => import("@/views/404.vue")
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    const hasUser = JSON.parse(sessionStorage.getItem("user")) || false;
    if (to.matched.some(record => record.meta.requireAuth)) {
        if (hasUser) {
            next();
        } else {
            next("/login");
        }
    } else {
        next();
    }
});
export default router;