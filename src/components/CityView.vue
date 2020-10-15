<script>
export default {
  props: {},

  components: {},

  data: () => ({
    //
  }),

  mounted() {},

  methods: {
    openFullscreen() {
      let elem = document.getElementById("city-view");

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
    },

    closeFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }
};
</script>

<template>
  <div class="position-relative city-view-wrapper">
    <div class="view-actions">
      <v-btn @click="openFullscreen" height="40" color="#ff57223d" dark>
        <v-icon>
          mdi-open-in-new
        </v-icon>
      </v-btn>
    </div>
    <!-- <swiper
      :options="{
        slidesPerView: '1'
      }"
    >
      <swiper-slide>
        <img
          :height="height"
          id="city-view"
          src="../assets/city.gif"
          alt="city.gif"
        />
      </swiper-slide>
    </swiper> -->

    <img
      width="100%"
      height="100%"
      id="city-view"
      src="../assets/city.gif"
      alt="city.gif"
    />
  </div>
</template>

<style scoped lang="scss">
.view-actions {
  height: 0;
  transition: all 0.2s;
  overflow: hidden;
}

.city-view-wrapper:hover {
  .view-actions {
    height: 40px;
  }
}
</style>
