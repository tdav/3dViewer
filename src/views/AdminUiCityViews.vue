<script>
import AddStoreItem from "../components/Modals/AddStoreItem.vue";
import AddCityView from "../components/Modals/AddCityView.vue";
import weathers from "../utils/weathers.json";
import timeOfDay from "../utils/timeOfDay.json";

export default {
  components: {
    //
  },

  data() {
    return {
      headers: [],
      cityHeaders: [],
      dialog: false,
      loading: false,
      selectedStoreItem: {},
      selectedCityView: {},
      bottomSheet: false,
      height: 100
    };
  },

  watch: {
    "$i18n.locale"() {
      this.onChanedLang();
    }
  },

  computed: {
    storeItems: vm => vm.$store.getters.getStoreItems,
    cityViews: vm => vm.$store.getters.getCityViews
  },

  created() {
    this.onChanedLang();
    this.loading = true;
    this.load().then(() => {
      this.loading = false;
    });
  },

  mounted() {
    this.height = document.body.offsetHeight;
  },

  methods: {
    onChanedLang() {
      this.headers = [
        {
          text: "",
          sortable: false,
          value: "action"
        },
        {
          text: "#",
          sortable: false,
          value: "num"
        },
        {
          text: "Наименование",
          value: "name"
        },
        {
          text: "Цена",
          value: "price"
        },
        {
          text: "Описание",
          value: "description"
        },
        {
          text: "Страна",
          value: "country"
        },
        {
          text: "Город",
          value: "city"
        }
      ];
      this.cityHeaders = [
        {
          text: "",
          value: "weather"
        },
        {
          text: "Weather key",
          value: "weatherKey"
        },
        {
          text: "Время",
          value: "index"
        },
        {
          text: "Наименование",
          value: "name"
        }
      ];
    },

    onAdd() {
      this.$modal.show(
        AddStoreItem,
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

    onDelete() {
      this.loading = true;
      this.$store
        .dispatch("deleteStoreItem", this.selectedStoreItem)
        .then(status => {
          this.loading = false;
          if (status) this.selectedStoreItem = {};
        });
    },

    onAddCityView() {
      this.bottomSheet = false;
      this.$modal.show(
        AddCityView,
        {
          item: null,
          storeItem: this.selectedStoreItem
        },
        {
          height: "auto",
          width: "650",
          scrollable: true,
          clickToClose: false
        },
        {
          "before-close": () => {
            this.bottomSheet = true;
          }
        }
      );
    },

    onDeleteCityView() {
      this.loading = true;
      this.$store
        .dispatch("deleteCityView", this.selectedCityView)
        .then(status => {
          this.loading = false;
          if (status) this.selectedCityView = {};
        });
    },

    onSelect(storeItem) {
      this.selectedStoreItem = { ...storeItem };
    },

    onSelectCityView(item) {
      this.selectedCityView = { ...item };
    },

    async load() {
      await this.$store.dispatch("initStoreItems");
      await this.$store.dispatch("initCountrys");
    },

    getWeather(key) {
      let w = weathers.find(x => x.key == key) || {};
      return w.descriptionEn;
    },

    getTime(id) {
      let t = timeOfDay.find(x => x.id == id) || {};
      return t.name;
    },

    onWatch(id) {
      this.loading = true;
      this.$store.dispatch("initCityViews", id).then(() => {
        this.loading = false;
        this.selectedCityView = this.cityViews.length ? this.cityViews[0] : {};
        this.bottomSheet = !this.bottomSheet;
      });
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
            Вид на город
          </div>
          <v-spacer></v-spacer>

          <v-btn
            class="mr-2"
            :disabled="!selectedStoreItem.id"
            @click="onDelete"
            color="red"
            :dark="!!selectedStoreItem.id"
          >
            <v-icon class="mr-1">mdi-delete</v-icon>
            {{ $t("Delete") }}
          </v-btn>

          <!--<v-btn class="mr-2" :disabled="!selectedStoreItem.id" @click="onEdit">
            <v-icon class="mr-1">mdi-pencil</v-icon>
            {{ $t("Edit") }}
          </v-btn> -->

          <v-btn @click="onAdd" dark color="primary">
            <v-icon class="mr-1">mdi-plus</v-icon>
            {{ $t("Add") }}
          </v-btn>
        </v-toolbar>
      </v-col>
      <v-col cols="12">
        <v-card :loading="loading">
          <v-data-table
            :maxHeight="height - 170"
            hide-default-footer
            disable-pagination
            :headers="headers"
            :items="storeItems"
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
                  :class="selectedStoreItem.id == item.id && 'tb-active'"
                  @click="onSelect(item)"
                  :key="item.id"
                  v-for="(item, inx) in props.items"
                >
                  <td width="20">
                    <v-icon @click="onWatch(item.id)">
                      mdi-chevron-right
                    </v-icon>
                  </td>
                  <td width="20">
                    <span class="text-nowrap" style="width:20px">
                      {{ (inx + 1) | sum }}
                    </span>
                  </td>
                  <td>
                    <a
                      :href="$tools.getUrl(item.url)"
                      target="_blank"
                      class="text-nowrap"
                      v-text="item.name"
                    />
                  </td>
                  <td>
                    <span class="text-nowrap">
                      {{ item.price | sum }}
                    </span>
                  </td>
                  <td>
                    {{ item.description }}
                  </td>
                  <td>
                    {{ item.country }}
                  </td>
                  <td>
                    {{ item.city }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <v-bottom-sheet v-model="bottomSheet">
      <v-sheet class="px-3" :height="height - 65">
        <div class="d-flex py-3">
          <v-spacer />

          <v-btn
            class="mr-2"
            :disabled="!selectedCityView.id"
            @click="onDeleteCityView"
            color="red"
            :dark="!!selectedCityView.id"
          >
            <v-icon class="mr-1">mdi-delete</v-icon>
            {{ $t("Delete") }}
          </v-btn>

          <!--<v-btn class="mr-2" :disabled="!selectedStoreItem.id" @click="onEdit">
            <v-icon class="mr-1">mdi-pencil</v-icon>
            {{ $t("Edit") }}
          </v-btn> -->

          <v-btn class="mr-2" @click="onAddCityView" dark color="primary">
            <v-icon class="mr-1">mdi-plus</v-icon>
            {{ $t("Add") }}
          </v-btn>

          <v-btn dark color="primary" @click="bottomSheet = !bottomSheet">
            Закрыть
          </v-btn>
        </div>
        <v-card>
          <v-data-table
            :height="height - 180"
            hide-default-footer
            disable-pagination
            :headers="cityHeaders"
            :items="cityViews"
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
                  :class="selectedCityView.id == item.id && 'tb-active'"
                  @click="onSelectCityView(item)"
                  :key="item.id"
                  v-for="item in props.items"
                >
                  <td style="background-color:rgb(168 220 222)" width="30">
                    <img
                      width="45"
                      :src="`/weather/${item.weatherKey}@2x.png`"
                      :alt="item.weatherKey"
                    />
                  </td>
                  <td>
                    {{ getWeather(item.weatherKey) }}
                  </td>
                  <td>
                    <span class="text-nowrap" style="width:30px">
                      {{ getTime(item.index) }}
                    </span>
                  </td>
                  <td>
                    <a
                      :href="`/files/backgrounds/${item.url}`"
                      target="_blank"
                      class="text-nowrap"
                      v-text="item.name"
                    />
                  </td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
        </v-card>
      </v-sheet>
    </v-bottom-sheet>
  </v-container>
</template>

<style lang="scss" scoped>
//
</style>
