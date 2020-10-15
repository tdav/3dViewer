<script>
import Header from "../components/Header.vue";

export default {
  components: {
    Header
  },

  data: () => ({
    drawer: true
  }),

  computed: {
    storeItems: vm => vm.$store.getters.getStoreItems
  },

  created() {
    this.$store.dispatch("initStoreItems");
  },

  methods: {
    onBuyItem(id) {
      this.$store.dispatch("initYandexPays", id);
    }
  }
};
</script>

<template>
  <div>
    <Header v-model="drawer" fixed />
    <v-container>
      <v-row>
        <v-col
          v-for="(item, key) in storeItems"
          :key="key"
          cols="12"
          md="5"
          lg="4"
        >
          <v-card class="mx-auto" max-width="400">
            <v-img
              class="white--text align-end"
              height="200px"
              :src="$tools.getUrl(item.url)"
            >
              <v-card-title>{{ item.name }}</v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0">
              {{ item.price | sum }}
            </v-card-subtitle>

            <v-card-text class="text--primary">
              <div v-html="item.description" />
            </v-card-text>

            <v-card-actions>
              <div class="text-center w-100">
                <v-btn block v-if="item.payed" disabled color="orange" text>
                  Куплено
                </v-btn>
                <v-btn
                  v-else
                  block
                  @click="onBuyItem(item.id)"
                  color="orange"
                  text
                >
                  Купить
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col v-if="!storeItems.length" class="text-center pt-5">
          Нет данных...
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
