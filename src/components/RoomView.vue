<script>
export default {
  props: {
    height: Number
  },

  components: {},

  data: () => ({
    //
  }),

  computed: {
    roomView: vm => vm.$store.getters.getCurrentRoomView
  },

  created() {
    this.$store.dispatch("initUserRoomViews");
  },

  methods: {
    openFullscreen() {
      let elem = document.getElementById("room-view");

      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE/Edge */
        elem.msRequestFullscreen();
      }
    }
  }
};
</script>

<template>
  <div
    :style="{ maxHeight: `${height}px` }"
    class="position-relative room-view-wrapper"
  >
    <div class="view-actions">
      <v-btn to="/store" height="40" color="#ff57223d" dark>
        <v-icon>mdi-cart-outline</v-icon>
      </v-btn>
      <v-btn
        class="ml-3"
        @click="openFullscreen"
        height="40"
        color="#ff57223d"
        dark
      >
        <v-icon> mdi-open-in-new </v-icon>
      </v-btn>
    </div>
    <img
      v-if="roomView.url"
      :height="height"
      id="room-view"
      width="100%"
      :src="`/files/backgrounds/${roomView.url}`"
      alt="room"
    />
    <img
      :height="height"
      id="room-view"
      width="100%"
      v-else
      src="../assets/room.gif"
      alt="room"
    />
  </div>
</template>

<style scoped lang="scss">
.view-actions {
  height: 0;
  transition: all 0.1s;
  overflow: hidden;
}

.room-view-wrapper:hover {
  .view-actions {
    height: 40px;
  }
}
</style>
