<script>
import LogoutAlert from "./Modals/LogoutAlert.vue";
import menuItems from "../utils/menuItems.js";

export default {
  components: {
    LogoutAlert
  },

  props: {
    value: Boolean,
    fixed: Boolean
  },

  data: () => ({
    isLogoutAlert: false,
    searchInput: false,
    isPlay: false,
    menuItems
  }),

  computed: {
    user: vm => vm.$store.getters.getUser,
    fullName() {
      return this.user.fullName;
    },

    hasSlot() {
      return !!this.$slots.default;
    },

    drawer: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit("input", v);
      }
    },

    ticker: vm => vm.$store.getters.getCurrentTicker
  },

  watch: {
    "$i18n.locale"(v) {
      this.$bStore.setLocal("lang", v);
    }
  },

  methods: {
    onThemeChange() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      this.$bStore.setLocal("$vuetify.theme.dark", this.$vuetify.theme.dark);
    },

    onPlay() {
      this.isPlay = !this.isPlay;
      let player = document.getElementById("_efir_player");
      if (this.isPlay) {
        player.play();
      } else {
        player.pause();
      }
    }
  }
};
</script>

<template>
  <div>
    <v-app-bar clipped-left :app="fixed" height="55" color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <router-link tag="div" to="/home" class="app-title cursor-pointer">
          VIRALAX
        </router-link>
      </v-toolbar-title>
      <v-spacer v-if="searchInput" />
      <div
        v-else
        class="d-flex align-items-center"
        style="width: -webkit-fill-available;"
      >
        <marquee behavior="left" direction="left">
          {{ ticker.nameRu }}
        </marquee>
      </div>

      <!-- <div class="player">
        <div class="d-flex align-items-center">
          <marquee
            onmousedown="this.stop();"
            onmouseup="this.start();"
            class="fs-12"
            scrollamount="2"
            behavior="left"
            direction="left"
          >
            Виктор Цой - Звезда по имени Солнце.mp3
          </marquee>
        </div>
        <div style="display: flex;justify-content: space-around;">
          <v-btn icon small>
            <v-icon>mdi-pause</v-icon>
          </v-btn>
        </div>
      </div> -->
      <div v-if="searchInput" style="min-width:200px">
        <v-text-field placeholder="Поиск" hide-details dense />
      </div>
      <v-btn class="mr-3" @click="searchInput = !searchInput" icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn @click="onPlay" icon>
        <v-icon v-if="isPlay">mdi-pause</v-icon>
        <v-icon v-else>mdi-play</v-icon>

        <audio
          class="d-none"
          data-outreach="true"
          id="_efir_player"
          data-playlist="https://101.ru/api/channel/getListServersChannel/99/channel/?dataFormat=html5"
          data-progress="false"
          preload="none"
          data-type="audio/aac"
          data-callbacks-inited="true"
          src="https://pub0302.101.ru:8443/stream/air/aac/64/99"
        />
      </v-btn>
      <v-badge color="pink" dot>
        <v-btn icon class="mx-3">
          <v-icon>mdi-bell</v-icon>
        </v-btn>
      </v-badge>
      <!-- 
      <v-menu min-width="250">
        <template v-slot:activator="{ on: menu, attrs }">
          <v-avatar size="36" v-bind="attrs" v-on="menu">
            <img src="../assets/img/avatar.jpg" alt="John" />
          </v-avatar>
        </template>
        <v-list> -->
      <!-- <v-list-item-group v-model="$vuetify.theme.dark">
            <v-list-item @click="onThemeChange" :value="true">
              <v-list-item-avatar>
                <v-icon v-if="$vuetify.theme.dark">
                  mdi-white-balance-sunny
                </v-icon>
                <v-icon v-else>
                  mdi-weather-night
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-title>
                {{ $t("Dark mode") }}
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
          <v-divider />
          <v-subheader>{{ $t("Application language") }}</v-subheader>
          <v-list-item-group v-model="$i18n.locale">
            <v-list-item value="uz">
              <v-list-item-avatar>
                <v-img src="../assets/img/flags/uz.png" />
              </v-list-item-avatar>
              <v-list-item-title>English</v-list-item-title>
            </v-list-item>
            <v-list-item value="ru">
              <v-list-item-avatar>
                <v-img src="../assets/img/flags/ru.png" />
              </v-list-item-avatar>
              <v-list-item-title>Русский язык</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
          <v-divider /> -->
      <!-- <v-list-item to="/admin">
            <v-list-item-avatar>
              <v-icon>mdi-table-cog</v-icon>
            </v-list-item-avatar>
            <v-list-item-title>{{ $t("Control Panel") }}</v-list-item-title>
          </v-list-item>
          <v-list-item to="/admin">
            <v-list-item-avatar>
              <v-icon>mdi-table-cog</v-icon>
            </v-list-item-avatar>
            <v-list-item-title>{{ $t("Control Panel") }}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="isLogoutAlert = true">
            <v-list-item-avatar>
              <v-icon>mdi-lock</v-icon>
            </v-list-item-avatar>
            <v-list-item-title>{{ $t("Log out") }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu> -->
    </v-app-bar>

    <LogoutAlert v-if="isLogoutAlert" v-model="isLogoutAlert" />

    <slot />

    <v-navigation-drawer
      width="320"
      v-if="!hasSlot"
      v-model="drawer"
      fixed
      :temporary="!fixed"
      app
      clipped
    >
      <template v-slot:prepend>
        <v-list-item class="my-4">
          <v-list-item-avatar width="70" height="70">
            <v-img v-if="user.faceImageUrl" :src="user.faceImageUrl" />
            <img v-else src="../assets/img/avatar.png" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
              {{ user.firstName }} {{ user.lastName }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ user.email }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider />
      </template>

      <template v-for="(item, key) in menuItems">
        <v-list-group
          v-if="Array.isArray(item.childs)"
          :key="key"
          v-model="item.active"
          no-action
        >
          <!-- :prepend-icon="item.icon" -->
          <template v-slot:activator>
            <v-list-item-avatar>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-avatar>
            <v-list-item-title v-text="item.name"></v-list-item-title>
          </template>

          <v-list-item
            :to="child.url"
            v-for="(child, childKey) in item.childs"
            :key="`ch-${childKey}`"
          >
            <!-- <v-list-item-avatar>
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-avatar> -->
            <v-list-item-content>
              <v-list-item-title v-text="child.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item v-else :to="item.url" :key="key">
          <v-list-item-avatar>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item>
        <v-divider v-if="key != menuItems.length - 1" :key="`d-${key}`" />
      </template>

      <template v-slot:append>
        <v-divider />
        <v-list-item @click="isLogoutAlert = true">
          <v-list-item-avatar>
            <v-icon>mdi-lock</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>{{ $t("Log out") }}</v-list-item-title>
        </v-list-item>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<style scoped lang="scss">
.app-title {
  width: 155px;
}

.fs-12 {
  font-size: 12px;
}

.player {
  min-width: 180px;
  width: 180px;
}
</style>
