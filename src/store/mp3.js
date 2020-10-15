import axios from "../service/axios.js";
// import i18n from "../i18n.js";

export default {
  state: {
    mp3s: []
  },

  mutations: {
    initMp3s(state, mp3s) {
      state.mp3s = Array.isArray(mp3s) ? mp3s : [];
    },

    addMp3(state, payload) {
      let old = state.mp3s.find(x => x.id == payload.id);
      if (old) {
        state.mp3s = state.mp3s.map(mp3 => {
          if (mp3.id == payload.id) {
            return payload;
          } else {
            return mp3;
          }
        });
      } else {
        state.mp3s.push(payload);
      }
    },

    deleteMp3(state, payload) {
      state.mp3s = state.mp3s.filter(mp3 => mp3.id != payload.id);
    }
  },

  actions: {
    async initMp3s({ commit }) {
      try {
        const res = await axios.get("mp3");
        commit("initMp3s", res.data);
        return true;
      } catch (e) {
        // let err = e.response;
        // if (err && err.data) {
        //   commit("setSnkMsg", {
        //     text: i18n.t("Invalid email or password!")
        //   });
        // }
        return false;
      }
    },

    async addMp3({ commit }, param) {
      try {
        const res = await axios.post("mp3", param);
        commit("addMp3", res.data);
        return true;
      } catch (e) {
        // let err = e.response;
        // if (err && err.data) {
        //   commit("setSnkMsg", {
        //     text: i18n.t("Invalid email or password!")
        //   });
        // }
        return false;
      }
    },

    async deleteMp3({ commit }, param) {
      try {
        await axios.delete(`mp3/${param.id}`);
        commit("deleteMp3", param);
        return true;
      } catch (e) {
        // let err = e.response;
        // if (err && err.data) {
        //   commit("setSnkMsg", {
        //     text: i18n.t("Invalid email or password!")
        //   });
        // }
        return false;
      }
    }
  },

  getters: {
    getMp3s: state => state.mp3s
  }
};
