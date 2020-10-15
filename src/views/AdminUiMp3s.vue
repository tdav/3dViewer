<script>
import AddMp3 from "../components/Modals/AddMp3.vue";

export default {
  components: {
    //
  },

  data() {
    return {
      headers: [],
      dialog: false,
      loading: false,
      selectedMp3: {}
    };
  },

  watch: {
    "$i18n.locale"() {
      this.onChanedLang();
    }
  },

  computed: {
    mp3s: vm => vm.$store.getters.getMp3s
  },

  created() {
    this.onChanedLang();
    this.$store.dispatch("initMp3s");
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
          text: "Наименование",
          value: "name"
        }
      ];
    },

    onAdd() {
      this.$modal.show(
        AddMp3,
        {
          item: null
        },
        {
          height: "auto",
          width: "350",
          scrollable: true,
          clickToClose: false
        }
      );
    },

    onDelete() {
      this.$store.dispatch("deleteMp3", this.selectedMp3).then(status => {
        if (status) this.selectedMp3 = {};
      });
    },

    onSelect(mp3) {
      this.selectedMp3 = { ...mp3 };
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
            Список музыки
          </div>
          <v-spacer></v-spacer>

          <v-btn
            class="mr-2"
            :disabled="!selectedMp3.id"
            @click="onDelete"
            color="red"
            :dark="!!selectedMp3.id"
          >
            <v-icon class="mr-1">mdi-delete</v-icon>
            {{ $t("Delete") }}
          </v-btn>

          <!--<v-btn class="mr-2" :disabled="!selectedMp3.id" @click="onEdit">
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
            hide-default-footer
            disable-pagination
            :headers="headers"
            :items="mp3s"
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
                  :class="selectedMp3.id == item.id && 'tb-active'"
                  @click="onSelect(item)"
                  :key="item.id"
                  v-for="(item, inx) in props.items"
                >
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
