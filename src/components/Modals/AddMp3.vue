<script>
export default {
  props: {
    item: Object
  },

  components: {
    //
  },

  data: () => ({
    mp3: {
      name: null,
      file: null,
      type: null
    },

    loading: false
  }),

  computed: {
    //
  },

  created() {
    if (this.item) this.mp3 = { ...this.item };
  },

  methods: {
    onSave() {
      let mp3Form = this.$refs.mp3Form;
      if (mp3Form.validate()) {
        let newForm = new FormData(mp3Form.$el);
        this.$store.dispatch("addMp3", newForm).then(status => {
          this.loading = false;
          if (status) this.onClose();
        });
      }
    },

    onClose() {
      this.$emit("close");
    }
  }
};
</script>

<template>
  <v-form ref="mp3Form" onsubmit="return false;" lazy-validation>
    <v-card :loading="loading">
      <v-card-title class="pb-0">
        <span class="headline">Mp3</span>
        <v-spacer />
        <v-btn icon @click="onClose">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                autofocus
                outlined
                dense
                hide-details
                name="name"
                v-model="mp3.name"
                label="Название"
                :rules="[$valid.req]"
                required
              />
            </v-col>

            <v-col cols="12">
              <v-file-input
                hide-details
                outlined
                dense
                :rules="[$valid.file15mb]"
                prepend-icon
                required
                accept="audio/mp3,audio/*;capture=microphone"
                prepend-inner-icon="mdi-file-music"
                label="mp3"
                show-size
                validate-on-blur
                name="file"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn dark color="red" @click="onClose">
          {{ $t("Close") }}
        </v-btn>
        <v-btn dark color="primary" @click="onSave">
          {{ $t("Save") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
