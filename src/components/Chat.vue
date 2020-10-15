<script>
import ChatList from "./ChatList.vue";
import ChatContent from "./ChatContent.vue";

import AddGroup from "./Modals/AddGroup.vue";

import { debounce } from "debounce";

export default {
  props: {
    //
  },

  components: {
    ChatList,
    ChatContent
  },

  data: () => ({
    loading: false,
    searchInput: false,
    height: 300
  }),

  computed: {
    searchUserName: {
      get: vm => vm.$store.getters.getSearchUserName,
      set(v) {
        this.$store.dispatch("setSearchUserName", v);
      }
    }
  },

  mounted() {
    let room = document.getElementById("room-view");
    let bodyHeight = document.body.clientHeight;

    setTimeout(() => {
      if (room) {
        let height = room.offsetHeight + 110;
        this.height = bodyHeight - height;
      }
    });
  },

  methods: {
    onTmSearchChange: debounce(function() {
      let searchUserName = this.searchUserName;
      if (this.loading) return;

      if (searchUserName?.trim()) {
        this.setSelectedChat = {};
        // if (searchUserName?.trim() && searchUserName.length > 1) {
        this.loading = true;

        this.$store.dispatch("searchUsers", searchUserName).finally(() => {
          this.loading = false;
        });
      } else {
        this.$store.dispatch("setSearchUsers");
      }
    }, 600),
    onShowSearch() {
      this.searchInput = !this.searchInput;
      this.$nextTick(() => {
        let searchInput = this.$refs.searchInput;
        if (searchInput) {
          searchInput.focus();
        }
      });
    },

    onNewGroup() {
      this.$modal.show(
        AddGroup,
        {
          height: this.height - 500
        },
        {
          height: "auto",
          width: "500",
          scrollable: true,
          clickToClose: false
        }
      );
    }
  }
};
</script>

<template>
  <div>
    <v-toolbar style="width: 100%;max-height: 48px;" height="48" dense>
      <v-btn color="primary" height="40" dark @click="onNewGroup">
        <v-icon>
          mdi-plus
        </v-icon>
      </v-btn>
      <v-btn
        class="mx-3"
        height="40"
        dark
        color="primary"
        @click="onShowSearch"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-text-field
        v-if="searchInput"
        @keyup.enter="onTmSearchChange"
        @input="onTmSearchChange"
        v-model="searchUserName"
        placeholder="Поиск"
        hide-details
        dense
        ref="searchInput"
      />
    </v-toolbar>
    <div
      style="display: flex;
    flex-wrap: wrap;
    flex: 1;"
    >
      <ChatList :style="{ height: `${height}px` }" style="width:40%" />
      <ChatContent :style="{ height: `${height}px` }" style="width:60%" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-accent,
.input-accent:hover {
  box-sizing: border-box;
  border-radius: 0;
  padding: 0 16px;
  font-size: 15px;
  height: 40px;
  width: 100%;
  color: #1c1c1e;
  outline: none;
  font-weight: 500;
  // background-color: $lightGrey;
  // border: 1px solid $lightGreyD5;
  border: 0;
}

.input-accent::placeholder {
  // color: $grey;
  font-weight: normal;
}
</style>
