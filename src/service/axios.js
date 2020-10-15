import httpInterceptor from "../utils/httpInterseptor.js";
import axios from "axios";
import Vue from "vue";
httpInterceptor(axios);

export default axios;
Vue.prototype.axios = axios;
