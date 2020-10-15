import axios from "../service/axios.js";
// import i18n from "../i18n.js";

export default {
  state: {
    cityViews: []
  },

  mutations: {
    initCityViews(state, cityViews) {
      state.cityViews = Array.isArray(cityViews) ? cityViews : [];
    },

    addCityView(state, payload) {
      let old = state.cityViews.find(x => x.id == payload.id);
      if (old) {
        state.cityViews = state.cityViews.map(cityView => {
          if (cityView.id == payload.id) {
            return payload;
          } else {
            return cityView;
          }
        });
      } else {
        state.cityViews.push(payload);
      }
    },

    deleteCityView(state, payload) {
      state.cityViews = state.cityViews.filter(x => x.id != payload.id);
    }
  },

  actions: {
    async initCityViews({ commit }, storeItemId) {
      try {
        commit("initCityViews", []);
        const res = await axios.get(`background/by_store/${storeItemId}`);
        commit("initCityViews", res.data);
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

    async addCityView({ commit }, param) {
      try {
        const res = await axios.post("background", param);
        commit("addCityView", res.data);
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

    async deleteCityView({ commit }, param) {
      try {
        await axios.delete(`background/${param.id}`);
        commit("deleteCityView", param);
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
    getCityViews: state => state.cityViews
  }
};
