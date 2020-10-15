<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: false
    }
  },

  data: () => ({
    //
  }),

  computed: {
    dialog: {
      get: vm => vm.value,

      set(v) {
        this.$emit("input", v);
      }
    }
  },

  methods: {
    onLogout() {
      this.$bStore.sessionClear();
      this.$bStore.localClear();
      if (this.$route.path != "/") {
        this.$router.replace("/");
      }
    }
  }
};
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="400px">
      <v-card>
        <v-card-title class="pb-5 d-flex">
          <v-spacer />

          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <div class="title text-center">
            {{ $t("Are you sure you want to log out?") }}
          </div>

          <div class="subtitle red--text text-center pt-2">
            {{ $t("All data about you will be erased from the browser!") }}
          </div>
        </v-card-text>
        <v-card-actions>
          <div class="px-9 pt-4 pb-2 w-100">
            <v-btn color="red darken-1" block dark @click="onLogout">
              {{ $t("Log out") }}
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
