import browserStore from "../service/browserStore.js";

import axios from "../service/axios.js";
import i18n from "../i18n.js";

export default {
  state: {
    user: {}
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
      browserStore.setUser(state.user);
    },

    logout(state) {
      state.user = {};
      browserStore.setUser(state.user);
    }
  },

  actions: {
    initUser({ commit }) {
      let token = browserStore.getToken();

      if (token) {
        let user = browserStore.getUser();
        commit("setUser", user);
      } else {
        browserStore.delUser();
      }
    },

    async checkPhone(ctx, checkPhone) {
      try {
        const res = await axios.post("user/check", checkPhone);
        return res.data;
      } catch (e) {
        return false;
      }
    },

    async register({ commit }, regData) {
      try {
        const res = await axios.post("user/register", regData);
        commit("setUser", res.data);
        return true;
      } catch (e) {
        let err = e.response;
        if (err && err.data) {
          commit("setSnkMsg", { text: err.data.message });
        }
        return false;
      }
    },

    async login({ commit }, login) {
      try {
        const res = await axios.post("user/login", login);
        commit("setUser", res.data);

        return true;
      } catch (e) {
        let err = e.response;
        if (err && err.data) {
          commit("setSnkMsg", {
            text: i18n.t("Invalid email or password!")
          });
        }
        return false;
      }
    },

    async logout({ commit }) {
      commit("logout");
    }
  },

  getters: {
    getUser: state => state.user
  }
};
