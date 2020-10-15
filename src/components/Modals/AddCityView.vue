<script>
import weathers from "../../utils/weathers.json";
import timeOfDay from "../../utils/timeOfDay.json";

export default {
  props: {
    storeItem: Object,
    item: Object
  },

  components: {
    //
  },

  data: vm => ({
    cityView: {
      storeItemId: vm.storeItem.id,
      name: null,
      index: null,
      weatherKey: null,
      file: null
    },

    loading: false,
    weathers,
    timeOfDay
  }),

  computed: {
    //
  },

  created() {
    if (this.item) this.cityView = { ...this.item };
  },

  methods: {
    onSave() {
      let cityViewForm = this.$refs.cityViewForm;
      if (cityViewForm.validate()) {
        let newForm = new FormData(cityViewForm.$el);
        newForm.append("storeItemId", this.storeItem.id);
        this.$store.dispatch("addCityView", newForm).then(status => {
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
  <v-form ref="cityViewForm" onsubmit="return false;" lazy-validation>
    <v-card :loading="loading">
      <v-card-title class="pb-0">
        <span class="headline">CityView</span>
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
                outlined
                dense
                hide-details
                autofocus
                name="name"
                v-model="cityView.name"
                label="Название"
                :rules="[$valid.req]"
                required
              />
            </v-col>

            <v-col cols="6">
              <v-select
                :items="timeOfDay"
                item-text="name"
                item-value="id"
                outlined
                dense
                hide-details
                name="index"
                v-model="cityView.index"
                label="Время"
                :rules="[$valid.req]"
                required
              />
            </v-col>

            <v-col cols="6">
              <v-select
                :items="weathers"
                item-text="descriptionEn"
                item-value="key"
                outlined
                dense
                hide-details
                name="weatherKey"
                v-model="cityView.weatherKey"
                label="Weather Key"
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
                accept="video/*,image/*"
                prepend-inner-icon="mdi-image"
                label="City view"
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
