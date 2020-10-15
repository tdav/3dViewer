<script>
import signalrConnect from "../../service/signalrConnect.js";

import messageTypes from "../../service/messageTypes.js";

import { debounce } from "debounce";

import VueSimpleScrollbar from "vue-simple-scrollbar";

export default {
  props: {},

  components: {
    VueSimpleScrollbar
  },

  data: () => ({
    height: 100,

    searchText: "",
    newGroup: {
      name: "",
      users: []
    },
    loading: false
  }),

  mounted() {
    this.height = window.outerHeight / 2;
  },

  created() {
    //
  },

  computed: {
    searchUsers: vm => vm.$store.getters.getSearchUsersAddGroup,
    user: vm => vm.$store.getters.getUser,
    isValid: vm => vm.newGroup.name?.trim() && vm.newGroup.users.length
  },

  beforeDestroy() {
    this.$store.dispatch("searchUsersAddGroup");
  },

  methods: {
    onTmSearchChange: debounce(function() {
      let searchText = this.searchText;
      if (this.loading) return;

      if (searchText?.trim()) {
        // if (searchText?.trim() && searchText.length > 1) {
        this.loading = true;

        this.$store.dispatch("searchUsersAddGroup", searchText).finally(() => {
          this.loading = false;
        });

        // this.axios.get(`drugs?search=${searchText}`).then(res => {
        //   this.products = this.getArray(res.data.results);
        //   this.loading = false;
        // });
      } else {
        //
      }
    }, 600),

    onSave() {
      if (this.loading) return;
      let group = JSON.parse(JSON.stringify(this.newGroup));
      group.users.push(this.user.id);
      let connection = signalrConnect(this.$store);
      this.axios.post("contacts/add_group", group).then(res => {
        let param = {
          userId: -1,
          groupId: res.data,
          messageType: messageTypes.system,
          message: "Группа создана!"
        };

        connection.invoke("SendMsg", param).then(() => {});
        this.$emit("close");
      });
    }
  }
};
</script>

<template>
  <div class="py-4 px-4">
    <div class="pb-4">
      <v-text-field
        v-model="newGroup.name"
        autocomplete="off"
        hide-details
        outlined
        dense
        placeholder="Название группы"
      />
    </div>
    <v-divider />
    <div class="pb-2 pt-4">
      <v-text-field
        clearable
        autocomplete="off"
        @keyup.enter="onTmSearchChange"
        @input="onTmSearchChange"
        v-model="searchText"
        hide-details
        placeholder="Поиск"
        outlined
        dense
        append-icon="mdi-magnify"
      />
    </div>
    <v-card elevation="1" class="mt-2">
      <v-list
        :style="{ maxHeight: `${(height / 2) * 1.75}px` }"
        dense
        :height="(height / 2) * 1.4"
      >
        <VueSimpleScrollbar>
          <v-list-item-group color="primary" v-model="newGroup.users" multiple>
            <template v-for="(user, key) in searchUsers">
              <v-list-item :value="user.id" :key="`s-${key}`">
                <template v-slot:default="{ active }">
                  <v-list-item-avatar>
                    <v-img v-if="user.faceImageUrl" :src="user.faceImageUrl" />
                    <v-icon>mdi-account</v-icon>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title
                      v-text="`${user.firstName} ${user.lastName}`"
                    />
                  </v-list-item-content>
                  <v-list-item-action v-if="active">
                    <v-icon class="mr-4">
                      mdi-check-circle
                    </v-icon>
                  </v-list-item-action>
                </template>
              </v-list-item>

              <v-divider :key="`sd-${key}`"></v-divider>
            </template>
          </v-list-item-group>
        </VueSimpleScrollbar>
      </v-list>
    </v-card>
    <div class="d-flex pt-6 px-2">
      <div v-if="newGroup.users.length" class="primary--text">
        <v-icon color="primary"> mdi-check-all </v-icon>
        — {{ newGroup.users.length }}
      </div>
      <v-spacer />
      <v-btn
        class="text-transform-none"
        @click="$emit('close')"
        color="red"
        dark
      >
        Отменить
      </v-btn>
      <v-btn
        @click="onSave"
        :disabled="!isValid"
        class="ml-3 text-transform-none"
        color="primary"
      >
        Создать
      </v-btn>
    </div>
  </div>
</template>
