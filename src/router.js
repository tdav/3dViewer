import Vue from "vue";
import VueRouter from "vue-router";
import Login from "./views/auth/Login.vue";
import Register from "./views/auth/Register.vue";
import Home from "./views/Home.vue";
import Store from "./views/Store.vue";
import MyPurchases from "./views/MyPurchases.vue";
import AdminUi from "./views/AdminUi.vue";
import AdminUiCityViews from "./views/AdminUiCityViews.vue";
import AdminUiMp3s from "./views/AdminUiMp3s.vue";
import AdminUiTickers from "./views/AdminUiTickers.vue";
import AdminUiUsers from "./views/AdminUiUsers.vue";
import Blend3d from "./views/Blend3d.vue";
import NotFound404 from "./views/NotFound404.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/blend3d",
    name: "Blend3d",
    component: Blend3d
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/store",
    name: "Store",
    component: Store
  },
  {
    path: "/my-purchases",
    name: "MyPurchases",
    component: MyPurchases
  },
  {
    path: "/admin",
    component: AdminUi,
    children: [
      {
        path: "/admin",
        name: "AdminUiUsers",
        component: AdminUiUsers
      },
      {
        path: "/admin-views",
        name: "AdminUiCityViews",
        component: AdminUiCityViews
      },
      {
        path: "/admin-mp3",
        name: "AdminUiMp3s",
        component: AdminUiMp3s
      },
      {
        path: "/admin-ticker",
        name: "AdminUiTickers",
        component: AdminUiTickers
      }
    ]
  },
  {
    path: "*",
    name: "NotFound404",
    component: NotFound404
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
