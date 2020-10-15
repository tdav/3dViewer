<script>
import Header from "../components/Header.vue";
import b4w from "blend4web";
require("../../public/js/camera.anim.js");
require("../../public/js/b4w.init.js");

export default {
  components: {
    Header
  },

  data: () => ({
    drawer: true
  }),

  created() {
    b4w.require("example_main").init();
  },

  methods: {}
};
</script>

<template>
  <div>
    <Header v-model="drawer" fixed />
    <v-container>
      <v-row>
        <v-col cols="12" md="12" lg="12">
          <div id="main_canvas_container"></div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style>
#main_canvas_container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
