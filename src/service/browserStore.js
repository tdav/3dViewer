const bStore = {
  delLocal(a) {
    localStorage.removeItem(a);
  },

  setLocal(a, v) {
    localStorage.setItem(a, JSON.stringify(v));
  },

  getLocal(v) {
    let u = localStorage.getItem(v);
    if (u && u != "undefined") return JSON.parse(u);
  },

  localClear() {
    localStorage.clear();
  },

  delSession(a) {
    sessionStorage.removeItem(a);
  },

  setSession(a, v) {
    sessionStorage.setItem(a, JSON.stringify(v));
  },

  getSession(a) {
    let u = sessionStorage.getItem(a);
    if (u) return JSON.parse(u);
  },

  sessionClear() {
    sessionStorage.clear();
  },

  removeUser() {
    this.delSession("userData");
  },

  setUser(userData) {
    this.setSession("userData", userData);
  },

  getUser() {
    return this.getSession("userData");
  },

  getToken() {
    const userData = this.getSession("userData");
    if (!userData || !userData.token) return "";

    return userData.token;
  },

  getBearerToken() {
    let token = null;
    const userData = this.getSession("userData");
    if (userData && !userData.user) {
      token = userData.token;
    }

    return token ? `bearer ${token}` : null;
  },

  delUser() {
    this.delSession("userData");
  }

  // removeUser() {
  //   this.delLocal("userData");
  // },

  // setUser(userData) {
  //   this.setLocal("userData", userData);
  // },

  // getUser() {
  //   return this.getLocal("userData");
  // },

  // getToken() {
  //   const userData = this.getLocal("userData");
  //   if (!userData || !userData.token) return "";

  //   return userData.token;
  // },

  // getBearerToken() {
  //   let token = null;
  //   const userData = this.getLocal("userData");
  //   if (userData && !userData.user) {
  //     token = userData.token;
  //   }

  //   return token ? `bearer ${token}` : null;
  // },

  // delUser() {
  //   this.delLocal("userData");
  // }
};

import Vue from "vue";

export default bStore;
Vue.prototype.$bStore = bStore;
