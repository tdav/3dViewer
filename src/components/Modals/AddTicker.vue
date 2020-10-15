<script>
import Inputmask from "inputmask";

function dateTime(selector) {
  Inputmask({
    alias: "datetime",
    inputFormat: "dd.mm.yyyy HH:MM",
    placeholder: "дд.мм.гггг чч:мм",
    showMaskOnHover: false
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
    ticker: {
      nameRu: null,
      nameEn: null,
      time: null,
      countryId: 0
    },

    loading: false
  }),

  computed: {
    countrys: vm => vm.$store.getters.getCountrys
  },

  created() {
    if (this.item) this.ticker = { ...this.item };
  },

  mounted() {
    dateTime("#date-time");
  },

  methods: {
    onSave() {
      let tickerForm = this.$refs.tickerForm;
      if (tickerForm.validate()) {
        // let newForm = new FormData(tickerForm.$el);
        let param = { ...this.ticker };
        let time = this.$tools.getSysDateTime(param.time);
        param.time = new Date(time).toUTCString();

        this.$store.dispatch("addTicker", param).then(status => {
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
  <v-form ref="tickerForm" onsubmit="return false;" lazy-validation>
    <v-card :loading="loading">
      <v-card-title class="pb-0">
        <span class="headline">Ticker</span>
        <v-spacer />
        <v-btn icon @click="onClose">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-select
                autofocus
                :items="countrys"
                item-text="name"
                item-value="id"
                outlined
                dense
                hide-details
                name="countryId"
                v-model="ticker.countryId"
                label="Страна"
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
                name="name"
                v-model="ticker.time"
                label="Время"
                :rules="[$valid.req]"
                required
                id="date-time"
              />
            </v-col>

            <v-col cols="12">
              <v-textarea
                rows="2"
                outlined
                dense
                hide-details
                name="name"
                v-model="ticker.nameRu"
                label="Строка Ru"
                :rules="[$valid.req]"
                required
                counter="2500"
              />
            </v-col>

            <v-col cols="12">
              <v-textarea
                rows="2"
                outlined
                dense
                hide-details
                name="name"
                v-model="ticker.nameEn"
                label="Строка En"
                :rules="[$valid.req]"
                required
                counter="2500"
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
