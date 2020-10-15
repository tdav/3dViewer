<script>
export default {
  components: {
    //
  },

  data() {
    return {
      headers: [],
      dialog: false,
      loading: false,
      selectedUser: {}
    };
  },

  watch: {
    "$i18n.locale"() {
      this.onChanedLang();
    }
  },

  computed: {
    users: vm => vm.$store.getters.getUsers
  },

  created() {
    this.onChanedLang();
    this.loading = true;
    this.$store.dispatch("initUsers").then(() => {
      this.loading = false;
    });
  },

  mounted() {},

  methods: {
    onChanedLang() {
      this.headers = [
        //  "id": -1,
        //   "firstName": "tmp",
        //   "lastName": "",
        //   "email": "tmp@gmail.com",
        //   "username": "tmp",
        //   "password": null,
        //   "birthDate": null,
        //   "faceImageUrl": null,
        //   "lastLoginDate": null,
        //   "roleId": 1,
        //   "role": null,
        //   "phone": null,
        //   "online": false,
        //   "countryId": 1,
        //   "country": null,
        //   "cityId": 1,
        //   "city": null,
        //   "connectionId": null,
        //   "groups": null,
        //   "status": 1,
        //   "createUser": 1,
        //   "createDate": "2020-09-30T09:56:36.6533608",
        //   "updateUser": null,
        //   "updateDate": null

        {
          text: "#",
          sortable: false,
          value: "num"
        },
        {
          text: "Ф.И.О",
          value: "fullName"
        },
        {
          text: "эл. почта",
          value: "email"
        }
      ];
    },

    // onAdd() {
    //   this.$modal.show(
    //     AddUser,
    //     {
    //       item: null
    //     },
    //     {
    //       height: "auto",
    //       width: "350",
    //       scrollable: true,
    //       clickToClose: false
    //     }
    //   );
    // },

    // onDelete() {
    //   this.$store.dispatch("deleteUser", this.selectedUser).then(status => {
    //     if (status) this.selectedUser = {};
    //   });
    // },

    onSelect(user) {
      this.selectedUser = { ...user };
    }
  }
};
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-toolbar elevation="1" dense>
          <div class="fs-15">
            Список пользователей
          </div>
          <v-spacer></v-spacer>

          <!-- <v-btn
            class="mr-2"
            :disabled="!selectedUser.id"
            @click="onDelete"
            color="red"
            :dark="!!selectedUser.id"
          >
            <v-icon class="mr-1">mdi-delete</v-icon>
            {{ $t("Delete") }}
          </v-btn> -->

          <!--<v-btn class="mr-2" :disabled="!selectedUser.id" @click="onEdit">
            <v-icon class="mr-1">mdi-pencil</v-icon>
            {{ $t("Edit") }}
          </v-btn> -->

          <!-- <v-btn @click="onAdd" dark color="primary">
            <v-icon class="mr-1">mdi-plus</v-icon>
            {{ $t("Add") }}
          </v-btn> -->
        </v-toolbar>
      </v-col>
      <v-col cols="12">
        <v-card :loading="loading">
          <v-data-table
            hide-default-footer
            disable-pagination
            :headers="headers"
            :items="users"
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
                  :class="selectedUser.id == item.id && 'tb-active'"
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
                    <span class="text-nowrap" v-text="item.fullName" />
                  </td>
                  <td>
                    <span class="text-nowrap" v-text="item.email" />
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
