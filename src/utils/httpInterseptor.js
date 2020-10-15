import browserStore from "../service/browserStore.js";
import sysConfig from "./sysConfig.js";

import router from "../router";
import store from "../store";

export default axios => {
  axios.defaults.baseURL = sysConfig.serverUrl + "/api/";

  axios.interceptors.request.use(
    config => {
      let token = browserStore.getBearerToken();
      let isLoaded = browserStore.getSession("isLoaded");

      if (!isLoaded) {
        browserStore.setSession("isLoaded", true);
        store.dispatch("setAppLoading", true);
      }

      if (token) config.headers.Authorization = token;

      return config;
    },

    error => {
      store.dispatch("setAppLoading", false);

      if (error.response && error.response.status != undefined) {
        let status = error.response.status;
        let isNotAuth = status == 401 || status == 0;

        if (isNotAuth && router.currentRoute.path != "/") {
          store.dispatch("setIsAuthDialog");
        }
      }

      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    response => {
      store.dispatch("setAppLoading", false);
      return response;
    },

    error => {
      store.dispatch("setAppLoading", false);
      if (error.response && error.response.status != undefined) {
        let status = error.response.status;
        let isNotAuth = status == 401 || status == 0;

        if (isNotAuth && router.currentRoute.path != "/") {
          store.dispatch("setIsAuthDialog");
        }
      } else if (!error.response) {
        store.dispatch("setSnkMsg");
      }

      return Promise.reject(error);
    }
  );
};
