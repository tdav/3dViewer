import axios from "../service/axios.js";
// import i18n from "../i18n.js";
import tools from "../service/tools.js";
import browserStore from "../service/browserStore.js";

export default {
  state: {
    tickers: [],
    userTickers: [],
    currentTicker: {}
  },

  mutations: {
    initTickers(state, tickers) {
      state.tickers = Array.isArray(tickers) ? tickers : [];
    },

    setCurrentTicker(state, ticker) {
      state.currentTicker = ticker ? ticker : {};
    },

    addTicker(state, payload) {
      let old = state.tickers.find(x => x.id == payload.id);
      if (old) {
        state.tickers = state.tickers.map(ticker => {
          if (ticker.id == payload.id) {
            return payload;
          } else {
            return ticker;
          }
        });
      } else {
        state.tickers.push(payload);
      }
    },

    deleteTicker(state, payload) {
      state.tickers = state.tickers.filter(ticker => ticker.id != payload.id);
    }
  },

  actions: {
    async initTickers({ commit }) {
      try {
        const res = await axios.get("ticker");
        commit("initTickers", res.data);
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

    async initUserTickers({ commit, state, dispatch }) {
      var current = getCurrentTicker(state.userTickers);
      if (current) {
        commit("setCurrentTicker", current);

        tools.leftTime(() => {
          dispatch("initUserTickers");
        }, current.time);
      } else {
        try {
          let user = browserStore.getUser() || {};

          const res = await axios.get(`ticker/country/${user.countryId || 1}`);
          var newCurrent = getCurrentTicker(res.data);
          if (newCurrent) {
            commit("setCurrentTicker", newCurrent);

            tools.leftTime(() => {
              dispatch("initUserTickers");
            }, newCurrent.time);

            commit("initTickers", res.data);
          }

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

    async addTicker({ commit }, param) {
      try {
        const res = await axios.post("ticker", param);
        commit("addTicker", res.data);
        return true;
      } catch (e) {
        console.error(e);
        // let err = e.response;
        // if (err && err.data) {
        //   commit("setSnkMsg", {
        //     text: i18n.t("Invalid email or password!")
        //   });
        // }
        return false;
      }
    },

    async deleteTicker({ commit }, param) {
      try {
        await axios.delete(`ticker/${param.id}`);
        commit("deleteTicker", param);
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
    getTickers: state => state.tickers,
    getCurrentTicker: state => state.currentTicker
  }
};

function getCurrentTicker(tickers) {
  if (!Array.isArray(tickers)) return false;

  let curTickers = tickers
    .filter(x => new Date(x.time) - new Date() > 0)
    .sort((a, b) => new Date(a.time) - new Date(b.time));

  return curTickers.length ? curTickers[0] : false;
}
