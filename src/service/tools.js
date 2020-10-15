import sysConfig from "../utils/sysConfig.js";
var lt = require("long-timeout");

const tools = {
  getUrl: fileName => `${sysConfig.filesUrl}/files/${fileName}`,

  getRealDateTime(minutes, hours, days, months, years) {
    let date = new Date();

    if (minutes) date.setMinutes(date.getMinutes() + minutes);

    if (hours) date.setHours(date.getHours() + hours);

    if (days) date.setDate(date.getDate() + days);

    if (months) date.setMonth(date.getMonth() + months);

    if (years) date.setFullYear(date.getFullYear() + years);

    let year = date.getFullYear();
    let month = getNol(1 + date.getMonth());
    let day = getNol(date.getDate());
    let hour = getNol(date.getHours());
    let min = getNol(date.getMinutes());

    return `${year}-${month}-${day}T${hour}:${min}`;

    function getNol(e) {
      return e.toString().padStart(2, "0");
    }
  },

  getRealDate(days, months, years) {
    let date = new Date();

    if (days) date.setDate(date.getDate() + days);

    if (months) date.setMonth(date.getMonth() + months);

    if (years) date.setFullYear(date.getFullYear() + years);

    let year = date.getFullYear();
    let month = getNol(1 + date.getMonth());
    let day = getNol(date.getDate());

    return `${year}-${month}-${day}`;

    function getNol(e) {
      return e.toString().padStart(2, "0");
    }
  },

  getDate(d) {
    let date = new Date(d);

    let year = date.getFullYear();
    let month = getNol(1 + date.getMonth());
    let day = getNol(date.getDate());

    return `${day}.${month}.${year}`;

    function getNol(e) {
      return e.toString().padStart(2, "0");
    }
  },

  getRealTime(minutes, hours) {
    let date = new Date();

    if (minutes) date.setMinutes(date.getMinutes() + minutes);

    if (hours) date.setHours(date.getHours() + hours);

    let hour = getNol(date.getHours());
    let min = getNol(date.getMinutes());

    return `${hour}:${min}`;

    function getNol(e) {
      return e.toString().padStart(2, "0");
    }
  },

  getTime(d) {
    let date = new Date(d);

    let hour = getNol(date.getHours());
    let min = getNol(date.getMinutes());

    return `${hour}:${min}`;

    function getNol(e) {
      return e.toString().padStart(2, "0");
    }
  },

  getSysDateTime(str) {
    if (!str?.trim()) return str;

    let arr = str.replaceAll(" ", ".").split(".");
    if (arr.length == 4) {
      let [day, month, year, time] = arr;

      return `${year}-${month}-${day}T${time}`;
    } else {
      return str;
    }
  },

  getUniq(id = "uniq") {
    let uniq =
      Date.now().toString(36) +
      Math.random()
        .toString(36)
        .substr(2);

    return `${id}_${uniq}`;
  },

  parseMath() {
    if (
      "com" in window &&
      "wiris" in window.com &&
      "js" in window.com.wiris &&
      "JsPluginViewer" in window.com.wiris.js
    ) {
      setTimeout(() => {
        window.com.wiris.js.JsPluginViewer.parseDocument();
      }, 300);
    }
  },

  fullName({ firstName, lastName, fatherName }) {
    let f = firstName?.trim() ? firstName : "";
    let l = lastName?.trim() ? ` ${lastName}` : "";
    let fa = fatherName?.trim() ? ` ${fatherName}` : "";
    return f + l + fa;
  },

  leftTime(callback, dt) {
    let left = new Date(dt + " GMT").getTime() - new Date().getTime();

    if (left < 0) return;

    let timeout = lt.setTimeout(() => {
      callback();
      lt.clearTimeout(timeout);
    }, left);
  },

  leftCurZoneTime(callback, dt) {
    let left = new Date(dt).getTime() - new Date().getTime();
    if (left < 0) return;

    let timeout = lt.setTimeout(() => {
      callback();
      lt.clearTimeout(timeout);
    }, left);
  }
};

import Vue from "vue";

export default tools;
Vue.prototype.$tools = tools;
