<script>
import Header from "../components/Header.vue";

export default {
  components: {
    Header
  },

  data: () => ({
    drawer: true
  }),

  mounted() {
    //
  },

  methods: {
    //
  }
};
</script>

<template>
  <div>
    <Header fixed v-model="drawer" />
    <router-view />
  </div>
</template>
