import axios from "../service/axios.js";
// import i18n from "../i18n.js";

export default {
  state: {
    storeItems: []
  },

  mutations: {
    initStoreItems(state, storeItems) {
      state.storeItems = Array.isArray(storeItems) ? storeItems : [];
    },

    addStoreItem(state, payload) {
      let old = state.storeItems.find(x => x.id == payload.id);
      if (old) {
        state.storeItems = state.storeItems.map(storeItem => {
          if (storeItem.id == payload.id) {
            return payload;
          } else {
            return storeItem;
          }
        });
      } else {
        state.storeItems.push(payload);
      }
    },

    deleteStoreItem(state, payload) {
      state.storeItems = state.storeItems.filter(x => x.id != payload.id);
    }
  },

  actions: {
    async initStoreItems({ commit }) {
      try {
        const res = await axios.get("store");
        commit("initStoreItems", res.data);
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

    async addStoreItem({ commit }, { form, param }) {
      try {
        const res = await axios.post("store", form);
        let store = res.data;
        store.country = param.country;
        store.city = param.city;
        commit("addStoreItem", store);
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

    async deleteStoreItem({ commit }, param) {
      try {
        await axios.delete(`store/${param.id}`);
        commit("deleteStoreItem", param);
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
    getStoreItems: state => state.storeItems
  }
};
