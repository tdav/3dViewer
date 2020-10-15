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
    myPurchases: vm => vm.$store.getters.getMyPurchases
  },

  created() {
    this.$store.dispatch("initMyPurchases");
  },

  methods: {
    onApply(id) {
      id;
      // this.$store.dispatch("initYandexPays", id);
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
          v-for="(item, key) in myPurchases"
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
                <v-btn @click="onApply(item.id)" color="orange" text>
                  Применить
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col v-if="!myPurchases.length" class="text-center pt-5">
          Нет данных...
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
