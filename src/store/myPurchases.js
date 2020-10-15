import axios from "../service/axios.js";
// import i18n from "../i18n.js";

export default {
  state: {
    myPurchases: []
  },

  mutations: {
    initMyPurchases(state, myPurchases) {
      state.myPurchases = Array.isArray(myPurchases) ? myPurchases : [];
    }
    // addMyPurchase(state, payload) {
    //   let old = state.myPurchases.find(x => x.id == payload.id);
    //   if (old) {
    //     state.myPurchases = state.myPurchases.map(myPurchase => {
    //       if (myPurchase.id == payload.id) {
    //         return payload;
    //       } else {
    //         return myPurchase;
    //       }
    //     });
    //   } else {
    //     state.myPurchases.push(payload);
    //   }
    // },
    // deleteMyPurchase(state, payload) {
    //   state.myPurchases = state.myPurchases.filter(x => x.id != payload.id);
    // }
  },

  actions: {
    async initMyPurchases({ commit }) {
      try {
        const res = await axios.get(`store/my_payed_items`);
        commit("initMyPurchases", res.data);
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
    getMyPurchases: state => state.myPurchases
  }
};
