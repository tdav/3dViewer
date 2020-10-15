import Inputmask from "inputmask";

let inputmaskPlugin = {
  install(Vue) {
    Vue.directive("mask", {
      bind(el, binding) {
        Inputmask(binding.value).mask(el);
      }
    });
  }
};

export default inputmaskPlugin;
