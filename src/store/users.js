import axios from "../service/axios.js";
// import i18n from "../i18n.js";

export default {
  state: {
    users: []
  },

  mutations: {
    initUsers(state, users) {
      let arr = Array.isArray(users) ? users : [];

      state.users = arr.map(x => {
        x.fullName = `${x.firstName} ${x.lastName}`;
        return x;
      });
    }

    // addUser(state, payload) {
    //   let old = state.users.find(x => x.id == payload.id);
    //   if (old) {
    //     state.users = state.users.map(user => {
    //       if (user.id == payload.id) {
    //         return payload;
    //       } else {
    //         return user;
    //       }
    //     });
    //   } else {
    //     state.users.push(payload);
    //   }
    // },

    // deleteUser(state, payload) {
    //   state.users = state.users.filter(user => user.id != payload.id);
    // }
  },

  actions: {
    async initUsers({ commit }) {
      try {
        const res = await axios.get("user");
        commit("initUsers", res.data);
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

    // async addUser({ commit }, param) {
    //   try {
    //     const res = await axios.post("user", param);
    //     commit("addUser", res.data);
    //     return true;
    //   } catch (e) {
    //     // let err = e.response;
    //     // if (err && err.data) {
    //     //   commit("setSnkMsg", {
    //     //     text: i18n.t("Invalid email or password!")
    //     //   });
    //     // }
    //     return false;
    //   }
    // },

    // async deleteUser({ commit }, param) {
    //   try {
    //     await axios.delete(`user/${param.id}`);
    //     commit("deleteUser", param);
    //     return true;
    //   } catch (e) {
    //     // let err = e.response;
    //     // if (err && err.data) {
    //     //   commit("setSnkMsg", {
    //     //     text: i18n.t("Invalid email or password!")
    //     //   });
    //     // }
    //     return false;
    //   }
    // }
  },

  getters: {
    getUsers: state => state.users
  }
};
