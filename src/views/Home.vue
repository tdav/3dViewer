<script>
import Header from "../components/Header.vue";
import WeatherView from "../components/WeatherView.vue";
import CityView from "../components/CityView.vue";
import RoomView from "../components/RoomView.vue";
import Chat from "../components/Chat.vue";

export default {
  components: {
    Header,
    WeatherView,
    CityView,
    RoomView,
    Chat
  },

  data: () => ({
    width: 0,
    height: 0,
    drawer: false
  }),

  created() {
    //
  },

  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize);
  },

  destroyed() {
    window.removeEventListener("resize", this.onResize);
  },

  methods: {
    onResize() {
      this.width = window.outerWidth;
      this.height = document.body.clientHeight;
    }
  }
};
</script>

<template>
  <div class="h-100">
    <div>
      <Header v-model="drawer" />
    </div>
    <div class="h-100" :style="{ height: `${height - 55}px` }">
      <div class="d-flex h-100">
        <div style="width:100%;" class="h-100">
          <WeatherView />
          <CityView class="h-100" />
        </div>
        <div
          :style="{
            minWidth: `${width / 2.5}px`,
            maxWidth: `${width / 2.5}px`
          }"
          style="display: flex;flex-flow: column;height: 100%;max-height: 100%;"
        >
          <RoomView id="room-view" :height="height / 3" />
          <Chat
            style="height: 100%;height: 100%;display: flex;flex-direction : column;"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
