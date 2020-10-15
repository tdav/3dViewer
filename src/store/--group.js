import axios from "../service/axios.js";
// import i18n from "../i18n.js";

export default {
  state: {
    group: getNewGroup()
  },

  mutations: {
    setGroup(state, group) {
      state.group = group ? group : getNewGroup();
    }
  },

  actions: {
    async addGroup({ commit }) {
      try {
        const res = await axios.post("contacts/add_group");
        commit("setChats", res.data);
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
    getGroup: state => state.group
  }
};

function getNewGroup() {
  const newGroup = {
    name: null,
    users: []
  };

  return { ...newGroup };
}
