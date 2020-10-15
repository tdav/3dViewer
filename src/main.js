import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import VModal from "vue-js-modal";
Vue.use(VModal, { dynamic: true });

import AudioVisual from "vue-audio-visual";
Vue.use(AudioVisual);

import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/swiper.scss";
Vue.use(VueAwesomeSwiper);

import "./service/axios.js";
import "./service/tools.js";
import "./service/filters.js";
import "./service/browserStore.js";
import "./service/validators.js";

import VueInputMask from "./plugins/vue-inputmask.js";
Vue.use(VueInputMask);

import "vue-simple-scrollbar/dist/vue-simple-scrollbar.css";

import i18n from "./i18n";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount("#app");
