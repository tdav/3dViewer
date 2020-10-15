import axios from "../service/axios.js";
// import i18n from "../i18n.js";

export default {
  state: {
    countrys: [],
    citysByCountry: []
  },

  mutations: {
    initCountrys(state, countrys) {
      state.countrys = Array.isArray(countrys) ? countrys : [];
    },

    initCitysByCountry(state, citys) {
      state.citysByCountry = Array.isArray(citys) ? citys : [];
    }
  },

  actions: {
    async initCountrys({ commit, state }) {
      let isExist = Array.isArray(state.countrys) && state.countrys.length;
      if (isExist) return true;

      try {
        const res = await axios.get("country");
        commit("initCountrys", res.data);
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

    async initCitysByCountry({ commit }, countryId) {
      try {
        commit("initCitysByCountry", []);
        const res = await axios.get(`city/by_contry_id/${countryId}`);
        commit("initCitysByCountry", res.data);
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
    getCountrys: state => state.countrys,
    getCitysByCountry: state => state.citysByCountry
  }
};
