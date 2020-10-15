<script>
import initStates from "./store/initStates.js";
// import Login from "./components/Auth/Login.vue";
import signalrConnect from "./service/signalrConnect.js";

export default {
  components: {},

  data: () => ({
    //
  }),

  created() {
    initStates(this.$store);
  },

  computed: {
    snkMsg: vm => vm.$store.getters.getSnkMsg,
    appLoading: vm => vm.$store.getters.getAppLoading,
    user: vm => vm.$store.getters.getUser
  },

  watch: {
    user() {
      let token = this.$bStore.getToken();
      if (token) {
        signalrConnect(this.$store);
      }
    }
  },

  mounted() {}
};
</script>

<template>
  <v-app>
    <v-main>
      <modals-container />

      <router-view />

      <!-- <Loader v-if="appLoading" /> -->

      <v-snackbar
        v-model="snkMsg.isShow"
        top
        vertical
        :color="snkMsg.color"
        :timeout="8000"
      >
        {{ snkMsg.text ? snkMsg.text : $t("Check your internet connection!") }}
        <template v-slot:action>
          <v-btn
            :title="$t('Close')"
            class="textTansform_none"
            dark
            text
            @click="snkMsg.isShow = false"
          >
            {{ $t("Close") }}
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<style>
@import url("./assets/site.css");
</style>
