import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import auth from "./auth.js";
import chat from "./chat.js";
// import group from "./group.js";
import weather from "./weather.js";
import mp3 from "./mp3.js";
import storeItems from "./storeItems.js";
import cityViews from "./cityViews.js";
import ticker from "./ticker.js";
import users from "./users.js";
import countries from "./countries.js";
import buyItems from "./buyItems.js";
import myPurchases from "./myPurchases.js";
import roomView from "./roomView.js";

export default new Vuex.Store({
  modules: [
    auth,
    chat,
    weather,
    mp3,
    storeItems,
    cityViews,
    users,
    ticker,
    countries,
    buyItems,
    myPurchases,
    roomView
  ],

  state: {
    snkMsg: {
      text: null,
      color: "red",
      isShow: false
    },

    isAuthDialog: false,
    appLoading: false
  },

  mutations: {
    setSnkMsg(state, snkMsg) {
      if (!snkMsg) snkMsg = { text: null };
      snkMsg.isShow = true;
      if (!snkMsg.color) snkMsg.color = "red";
      state.snkMsg = snkMsg;
    },

    setIsAuthDialog(state, isAuthDialog) {
      state.isAuthDialog = isAuthDialog;
    },

    setAppLoading(state, appLoading) {
      state.appLoading = appLoading;
    }
  },

  actions: {
    setSnkMsg({ commit }, snkMsg) {
      commit("setSnkMsg", snkMsg);
    },

    setIsAuthDialog({ commit }, isAuthDialog) {
      commit("setIsAuthDialog", isAuthDialog);
    },

    setAppLoading({ commit }, appLoading) {
      commit("setAppLoading", appLoading);
    }
  },

  getters: {
    getSnkMsg: state => state.snkMsg,

    getIsAuthDialog: state => state.isAuthDialog,

    getAppLoading: state => state.appLoading
  }
});
