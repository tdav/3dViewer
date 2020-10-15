export const toTimestamp = strDate => {
  var datum = Date.parse(strDate);
  return datum / 1000;
};

export const sum = value => {
  return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : 0;
};

export const date = stringdate => {
  if (!stringdate) return "";

  let date = new Date(stringdate);

  let year = date.getFullYear();
  let month = getNol(1 + date.getMonth());
  let day = getNol(date.getDate());

  return `${day}.${month}.${year}`;

  function getNol(e) {
    return e.toString().padStart(2, "0");
  }
};

export const getDateTime = stringdate => {
  if (!stringdate) return "";

  let date = new Date(stringdate);

  let year = date.getFullYear();
  let month = getNol(1 + date.getMonth());
  let day = getNol(date.getDate());
  let hours = getNol(date.getHours());
  let minutes = getNol(date.getMinutes());

  return `${day}.${month}.${year} ${hours}:${minutes}`;

  function getNol(e) {
    return e.toString().padStart(2, "0");
  }
};

export const tel = value => {
  if (value && value.length == 12) {
    value = value.toString();
    let code1 = value.substr(0, 3);
    let code2 = value.substr(3, 2);
    let num1 = value.substr(5, 3);
    let num2 = value.substr(8, 2);
    let num3 = value.substr(10, 2);
    return `+${code1}(${code2}) ${num1}-${num2}-${num3}`;
  } else {
    return value;
  }
};

import Vue from "vue";

Vue.prototype.$toTimestamp = toTimestamp;
Vue.prototype.$sum = sum;
Vue.prototype.$date = date;
Vue.prototype.$dateTime = getDateTime;
Vue.prototype.$tel = tel;

Vue.filter("sum", sum);
Vue.filter("date", date);
Vue.filter("dateTime", getDateTime);
Vue.filter("tel", tel);
