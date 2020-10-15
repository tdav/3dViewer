import axios from "../service/axios.js";
// import i18n from "../i18n.js";

export default {
  state: {
    // yandexPay: []
  },

  mutations: {
    // initYandexPays(state, yandexPays) {
    //   state.yandexPays = Array.isArray(yandexPays) ? yandexPays : [];
    // },
    // addYandexPay(state, payload) {
    //   let old = state.yandexPays.find(x => x.id == payload.id);
    //   if (old) {
    //     state.yandexPays = state.yandexPays.map(yandexPay => {
    //       if (yandexPay.id == payload.id) {
    //         return payload;
    //       } else {
    //         return yandexPay;
    //       }
    //     });
    //   } else {
    //     state.yandexPays.push(payload);
    //   }
    // },
    // deleteYandexPay(state, payload) {
    //   state.yandexPays = state.yandexPays.filter(x => x.id != payload.id);
    // }
  },

  actions: {
    async initYandexPays(ctx, itemId) {
      try {
        const res = await axios.get(`yandexPay/new_order/${itemId}`);
        window.location.replace(res.data.confirmation.confirmationUrl);
        // commit("initYandexPays", res.data);
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
    // getYandexPays: state => state.yandexPays
  }
};
