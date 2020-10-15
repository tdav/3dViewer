<script>
// import VueSimpleScrollbar from "vue-simple-scrollbar";
import chatTypes from "../service/chatTypes.js";

export default {
  props: {
    //
  },

  components: {
    // VueSimpleScrollbar
  },

  data: () => ({
    chatTypes,
    globalChat: {
      id: -1,
      groupId: 1,
      avatar: null,
      name: "Глобальный чат",
      email: null,
      online: false,
      lastLoginDate: null,
      username: null
    }
  }),

  computed: {
    chats: vm => vm.$store.getters.getChats,
    searchUsers: vm => vm.$store.getters.getSearchUsers,
    selectedChat: {
      get: vm => vm.$store.getters.getSelectedChat,
      set(v) {
        this.$store.dispatch("setSelectedChat", v);
      }
    },
    selectedUser: {
      get: vm => vm.$store.getters.getSelectedUser,
      set(v) {
        this.$store.dispatch("setSelectedUser", v);
      }
    }
  },

  created() {
    this.$store.dispatch("initChats");
  }
};
</script>

<template>
  <div class="h-100" style="overflow:auto;border-right:1px solid #8e8e8e80">
    <v-list v-if="searchUsers.length" dense>
      <!-- <VueSimpleScrollbar> -->
      <v-list-item-group mandatory color="primary" v-model="selectedUser">
        <template>
          <v-list-item-subtitle class="pl-2 fs-11">
            Результаты поиска
          </v-list-item-subtitle>
          <template v-for="(user, key) in searchUsers">
            <v-list-item :value="user" :key="`s-${key}`">
              <v-list-item-avatar>
                <v-img v-if="user.faceImageUrl" :src="user.faceImageUrl" />
                <v-icon v-else>mdi-account</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>
                  {{ user.firstName }} {{ user.lastName }}
                </v-list-item-title>
                <v-list-item-subtitle v-text="user.email" />
              </v-list-item-content>
            </v-list-item>
            <v-divider :key="`sd-${key}`"></v-divider>
          </template>
        </template>
      </v-list-item-group>
      <!-- </VueSimpleScrollbar> -->
    </v-list>

    <v-list v-else dense>
      <!-- <VueSimpleScrollbar> -->
      <v-list-item-group mandatory v-model="selectedChat" color="primary">
        <v-list-item :value="globalChat">
          <v-list-item-avatar>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="globalChat.name"></v-list-item-title>
            <v-list-item-subtitle v-html="globalChat.email" />
          </v-list-item-content>
        </v-list-item>
        <v-divider v-if="chats.length"></v-divider>
        <template v-for="(chat, index) in chats">
          <v-list-item :value="chat" :key="index">
            <v-list-item-avatar>
              <v-img v-if="chat.avatar" :src="chat.avatar"></v-img>
              <v-icon v-else-if="chat.groupId > 2">
                mdi-account-multiple-check
              </v-icon>
              <v-icon v-else>mdi-account</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="chat.name"></v-list-item-title>
              <v-list-item-subtitle
                v-if="chat.groupId == 2"
                v-html="chat.email"
              />
            </v-list-item-content>
          </v-list-item>
          <v-divider :key="`d-${index}`"></v-divider>
        </template>
      </v-list-item-group>
      <!-- </VueSimpleScrollbar> -->
    </v-list>
  </div>
</template>

<style lang="scss" scoped>
.v-text-field--outlined,
.v-text-field--solo {
  border-radius: 0 !important;
}

.v-list {
  padding: 0;
}
</style>
