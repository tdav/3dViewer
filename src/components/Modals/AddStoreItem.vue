<script>
import Inputmask from "inputmask";

function number(selector) {
  Inputmask({
    alias: "numeric",
    groupSeparator: " ",
    digits: 0,
    min: 0,
    positionCaretOnClick: "select",
    autoUnmask: true,
    showMaskOnHover: false,
    rightAlign: false
  }).mask(document.querySelectorAll(selector));
}

export default {
  props: {
    item: Object
  },

  components: {
    //
  },

  data: () => ({
    storeItem: {
      name: null,
      description: null,
      price: null,
      countryId: 0,
      cityId: 0,
      id: 0
    },

    loading: false,
    citys: [],
    searchCitys: null
  }),

  computed: {
    countrys: vm => vm.$store.getters.getCountrys
    // citys: vm => vm.$store.getters.getCitysByCountry
  },

  created() {
    if (this.item) this.storeItem = { ...this.item };
  },

  mounted() {
    number("#price");
  },

  watch: {
    searchCitys(value) {
      if (this.citys.length > 0) return;

      if (this.loading) return;
      if (value?.trim() && value.length > 1) {
        this.loading = true;

        this.axios
          .get(`city/search_city/${value}`)
          .then(res => {
            this.citys = res.data;
          })
          .finally(() => (this.loading = false));
      }
    }
  },

  methods: {
    onSave() {
      let storeItemForm = this.$refs.storeItemForm;
      if (storeItemForm.validate()) {
        let param = { ...this.storeItem };
        let country = this.countrys.find(x => x.id == param.countryId) || {};
        param.country = country.name;

        let city = this.citys.find(x => x.id == param.cityId) || {};
        param.city = city.name;

        let form = new FormData(storeItemForm.$el);
        form.delete("cityId");
        form.append("cityId", this.storeItem.cityId);

        this.$store
          .dispatch("addStoreItem", { form, param })
          .then(status => {
            this.loading = false;
            if (status) this.onClose();
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },

    onClose() {
      this.$emit("close");
    },

    getCitys() {
      if (this.loading) return;
      this.$store
        .dispatch("initCitysByCountry", this.storeItem.countryId)
        .then(() => {})
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<template>
  <v-form ref="storeItemForm" onsubmit="return false;" lazy-validation>
    <v-card :loading="loading">
      <v-card-title class="pb-0">
        <span class="headline">Store Item</span>
        <v-spacer />
        <v-btn icon @click="onClose">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-text-field
                autofocus
                outlined
                dense
                hide-details
                name="name"
                v-model="storeItem.name"
                label="Название"
                :rules="[$valid.req]"
                required
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                autocomplete="off"
                outlined
                dense
                hide-details
                name="price"
                id="price"
                v-model="storeItem.price"
                label="Цена"
                :rules="[$valid.req]"
                required
                type="text"
              />
            </v-col>
            <v-col cols="6">
              <v-select
                :items="countrys"
                item-text="name"
                item-value="id"
                outlined
                dense
                hide-details
                name="countryId"
                v-model="storeItem.countryId"
                label="Страна"
                :rules="[$valid.req]"
                required
                @change="getCitys"
              />
            </v-col>
            <v-col cols="6">
              <v-autocomplete
                :disabled="!storeItem.countryId"
                :search-input.sync="searchCitys"
                hide-no-data
                outlined
                :loading="loading"
                :items="citys"
                item-text="name"
                item-value="id"
                dense
                hide-details
                name="cityId"
                v-model="storeItem.cityId"
                label="Город"
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
                accept="image/*"
                prepend-inner-icon="mdi-image"
                label="Background Image"
                show-size
                validate-on-blur
                name="file"
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                rows="1"
                outlined
                dense
                hide-details
                name="description"
                v-model="storeItem.description"
                label="Описание"
                :rules="[$valid.req]"
                required
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
