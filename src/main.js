import Vue from 'vue'
import App from './App.vue'
import router from './router';
// vuex
import store from './store';
// css global
import '@/scss/core.scss';
//Element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');