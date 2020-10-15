<script>
import AddTicker from "../components/Modals/AddTicker.vue";

export default {
  components: {
    //
  },

  data() {
    return {
      headers: [],
      dialog: false,
      loading: false,
      selectedTicker: {}
    };
  },

  watch: {
    "$i18n.locale"() {
      this.onChanedLang();
    }
  },

  computed: {
    tickers: vm => vm.$store.getters.getTickers,
    countrys: vm => vm.$store.getters.getCountrys,
    getCountry: vm => id => (vm.countrys.find(x => x.id == id) || {}).name
  },

  created() {
    this.$store.dispatch("initCountrys");
    this.onChanedLang();
    this.$store.dispatch("initTickers");
  },

  mounted() {},

  methods: {
    onChanedLang() {
      this.headers = [
        {
          text: "#",
          sortable: false,
          value: "num"
        },
        {
          text: "Наименование RU",
          value: "nameRu"
        },
        {
          text: "Наименование En",
          value: "nameEn"
        },
        {
          text: "Начало",
          value: "time"
        },
        {
          text: "Страна",
          value: "country"
        }
      ];
    },

    onAdd() {
      this.$modal.show(
        AddTicker,
        {
          item: null
        },
        {
          height: "auto",
          width: "650",
          scrollable: true,
          clickToClose: false
        }
      );
    },

    onEdit() {
      this.$modal.show(
        AddTicker,
        {
          item: JSON.parse(JSON.stringify(this.selectedTicker))
        },
        {
          height: "auto",
          width: "650",
          scrollable: true,
          clickToClose: false
        }
      );
    },

    onDelete() {
      this.$store.dispatch("deleteTicker", this.selectedTicker).then(status => {
        if (status) this.selectedTicker = {};
      });
    },

    onSelect(ticker) {
      this.selectedTicker = { ...ticker };
    }
  }
};
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-toolbar elevation="1" dense>
          <div class="fs-18">
            Бегущий строка
          </div>
          <v-spacer></v-spacer>

          <v-btn
            class="mr-2"
            :disabled="!selectedTicker.id"
            @click="onDelete"
            color="red"
            :dark="!!selectedTicker.id"
          >
            <v-icon class="mr-1">mdi-delete</v-icon>
            {{ $t("Delete") }}
          </v-btn>

          <v-btn class="mr-2" :disabled="!selectedTicker.id" @click="onEdit">
            <v-icon class="mr-1">mdi-pencil</v-icon>
            {{ $t("Edit") }}
          </v-btn>

          <v-btn @click="onAdd" dark color="primary">
            <v-icon class="mr-1">mdi-plus</v-icon>
            {{ $t("Add") }}
          </v-btn>
        </v-toolbar>
      </v-col>
      <v-col cols="12">
        <v-card :loading="loading">
          <v-data-table
            hide-default-footer
            disable-pagination
            :headers="headers"
            :items="tickers"
            key="id"
            mobile-breakpoint="0"
          >
            <template v-slot:body="props">
              <tbody>
                <tr v-if="!props.items.length">
                  <td class="pa-3 text-center" :colspan="headers.length + 1">
                    <template v-if="!loading">
                      {{ $t("No data") }}
                    </template>
                  </td>
                </tr>
                <tr
                  :class="selectedTicker.id == item.id && 'tb-active'"
                  @click="onSelect(item)"
                  :key="item.id"
                  v-for="(item, inx) in props.items"
                >
                  <td width="20">
                    <span class="text-nowrap" style="width:20px">
                      {{ (inx + 1) | sum }}
                    </span>
                  </td>
                  <td v-text="item.nameRu" />
                  <td v-text="item.nameEn" />
                  <td>
                    <span class="text-nowrap">
                      {{ item.time | dateTime }}
                    </span>
                  </td>
                  <td>
                    {{ getCountry(item.countryId) }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
//
</style>
