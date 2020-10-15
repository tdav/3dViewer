import i18n from "../i18n";
const email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const file15mb = i18n.t("The file size is larger than 15mb");

const valid = {
  req: v => !!v || "",
  email: v => email.test(v) || "",
  file15mb: v => !v || v.size < 15000000 || file15mb,

  minLength17: v => !v || v.length == 17 || ""
};

import Vue from "vue";
Vue.prototype.$valid = valid;
