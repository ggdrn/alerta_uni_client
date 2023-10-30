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
import VueTheMask from 'vue-the-mask'

import locale from 'element-ui/lib/locale/lang/pt-br';// Importe o pacote de tradução para pt-BR

Vue.use(ElementUI, { locale });
// mapa
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
// Correção do erro do webpack
import { Icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-popup', LPopup);
Vue.use(VueTheMask);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');