import tools from "../service/tools.js";
import timeOfDay from "../utils/timeOfDay.json";
// import browserStore from "../service/browserStore.js";
import axios from "../service/axios.js";

export default {
  state: {
    roomViews: [],
    currentRoomView: {}
  },

  mutations: {
    initRoomViews(state, roomViews) {
      state.roomViews = Array.isArray(roomViews) ? roomViews : [];
    },

    setCurrentRoomView(state, roomView) {
      state.currentRoomView = roomView ? roomView : {};
    }
  },

  actions: {
    async initUserRoomViews({ commit, dispatch, state }) {
      var current = getCurrentRoomView(state.roomViews);
      if (current) {
        commit("setCurrentRoomView", current);

        tools.leftCurZoneTime(() => {
          dispatch("initUserRoomViews");
        }, current.endTime);
      } else {
        try {
          // let user = browserStore.getUser() || {};

          // const res = await axios.get(`ticker/country/${user.countryId || 1}`);
          const res = await axios.get("background");
          var newCurrent = getCurrentRoomView(res.data);

          if (newCurrent) {
            commit("initRoomViews", res.data);
            commit("setCurrentRoomView", newCurrent);

            tools.leftCurZoneTime(() => {
              dispatch("initUserRoomViews");
            }, newCurrent.endTime);
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
    }
  },

  getters: {
    getCurrentRoomView: state => state.currentRoomView
  }
};

function getCurrentRoomView(roomViews) {
  if (!Array.isArray(roomViews)) return false;

  let curRoomViews = roomViews
    .filter((x, index) => {
      let second = roomViews[index + 1];
      if (!second) return true;
      // debugger;
      let time = timeOfDay.find(x => x.id == second.index) || {};
      return getTime(time.time) - new Date() > 0;
    })
    .sort((a, b) => getTime(a.time) - getTime(b.time));

  if (curRoomViews.length) {
    let cur = curRoomViews[0] || {};
    let second = curRoomViews[1] || {};
    let time = timeOfDay.find(x => x.id == second.index) || {};
    cur.endTime = getTime(time.time);
    return cur;
  } else if (roomViews.length) {
    let cur = roomViews[0] || {};
    cur.endTime = getTime(1);
    return cur;
  } else {
    return false;
  }

  function getTime(time) {
    let date = new Date();
    // date.setMinutes(Number(time) || 1);
    // date.setSeconds(0);
    date.setHours(time || 1);
    date.setMinutes(0);
    return date;
  }
}
