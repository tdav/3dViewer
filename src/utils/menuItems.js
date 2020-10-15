import i18n from "../i18n.js";

export default [
  {
    url: "/home",
    icon: "mdi-home",
    name: "Главная"
  },
  {
    icon: "mdi-table-cog",
    name: i18n.t("Control Panel"),
    childs: [
      {
        url: "/admin",
        icon: "mdi-account-multiple",
        name: "Пользователи"
      },
      {
        url: "/admin-views",
        icon: "mdi-city",
        name: "Вид на город"
      },
      {
        url: "/admin-mp3",
        icon: "mdi-file-music",
        name: "Музыка"
      },
      {
        url: "/admin-ticker",
        icon: "mdi-cursor-text",
        name: "Бегущий строка"
      }
    ]
  },
  {
    url: "/store",
    icon: "mdi-cart",
    name: "Магазин"
  },
  {
    url: "/my-purchases",
    icon: "mdi-longitude",
    name: "Мои покупки"
  }
  // {
  //   function: "LOG_OUT",
  //   icon: "mdi-lock",
  //   name: "Log out"
  // }
];
