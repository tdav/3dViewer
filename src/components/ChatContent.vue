<script>
// import VueSimpleScrollbar from "vue-simple-scrollbar";
import signalrConnect from "../service/signalrConnect.js";
import chatTypes from "../service/chatTypes.js";
import messageTypes from "../service/messageTypes.js";

export default {
  props: {
    //
  },

  components: {
    // VueSimpleScrollbar
  },

  data: () => ({
    messageText: "",
    messageTypes,
    loading: false
  }),

  computed: {
    user: vm => vm.$store.getters.getUser,
    messages: vm => vm.$store.getters.getMessages,
    selectedChat: vm => vm.$store.getters.getSelectedChat,
    selectedUser: vm => vm.$store.getters.getSelectedUser,
    isSend() {
      let is =
        (this.selectedUser && this.selectedUser.id) ||
        (this.selectedChat && this.selectedChat.id);

      return is && this.messageText?.trim();
    }
  },

  mounted() {},

  methods: {
    onSend() {
      if (!this.isSend) return;
      let connection = signalrConnect(this.$store);
      this.$store.dispatch("setSearchUserName", "");

      let param = {
        userId: -1,
        groupId: chatTypes.private,
        messageType: messageTypes.message,
        message: this.messageText
      };

      let isNewChat = this.selectedUser && this.selectedUser.id;
      if (isNewChat) {
        param.userId = this.selectedUser.id;
      } else {
        if (this.selectedChat.groupId == chatTypes.private) {
          param.userId = this.selectedChat.userId;
        } else {
          param.groupId = this.selectedChat.groupId;
        }
      }

      if (this.loading) return;
      this.loading = true;

      debugger;

      connection
        .invoke("SendMsg", param)
        .then(value => {
          if (value && value.groupId) {
            this.messageText = "";
            if (isNewChat) {
              this.$store.dispatch("setSearchUsers");
              this.$store.dispatch("initChats").then(() => {
                this.$store.dispatch("setSelectedChat", value);
              });
            } else {
              let pr = {
                value,
                chat: this.selectedChat
              };

              this.$store.dispatch("sendedMessage", pr);
            }
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },

    getLast(msg, index) {
      let secondMsg = this.messages[index + 1];
      return secondMsg ? secondMsg.from?.id != msg.from?.id : true;
    },

    getDate(msg, index) {
      let secondMsg = this.messages[index - 1];
      let gt = this.$tools.getDate;
      let date = gt(msg.createDate);
      if (!secondMsg) return date;
      return gt(secondMsg.createDate) != date ? date : false;
    },

    scrollMe(id) {
      setTimeout(() => {
        let elm = document.getElementById(id);
        if (elm) elm.scrollIntoView();
      }, 100);
    },

    getMyMsg(msg) {
      return this.user?.id == msg.from?.id;
    }
  }
};
</script>

<template>
  <div
    class="h-100"
    style="width: 60%;
    height: 364px;
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: hidden;"
  >
    <div class="chat-history">
      <!-- <VueSimpleScrollbar> -->
      <div
        v-for="(msg, index) in messages"
        :key="index"
        class="messages"
        :class="getMyMsg(msg) ? 'mine' : 'yours'"
      >
        <div v-if="msg.type == messageTypes.system" class="date">
          <span class="owerflow-wrap" v-html="msg.message" />
        </div>
        <template v-else>
          <div v-if="getDate(msg, index)" class="date">
            <span v-text="getDate(msg, index)" />
          </div>
          <div
            :id="'i' + index"
            class="message"
            :class="getLast(msg, index) ? 'last' : ''"
          >
            <template v-if="index == messages.length - 1">
              {{ scrollMe("i" + index) }}
            </template>
            <div class="pl-1 pr-8 owerflow-wrap" v-html="msg.message" />
            <div class="time">
              {{ $tools.getTime(msg.createDate) }}
            </div>
          </div>
        </template>
      </div>
      <!-- </VueSimpleScrollbar> -->
    </div>
    <div class="chat-footer">
      <v-text-field
        hide-details
        placeholder="Написать сообщение..."
        solo
        append-icon="mdi-send"
        @click:append="onSend"
        @keyup.enter="onSend"
        autocomplete="off"
        v-model="messageText"
      />
      <!-- <div>
        <v-icon color="primary" @click="onSend" class="ml-3">
          mdi-send
        </v-icon>
      </div> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
$white: #ffffff;
$black: #000000;

.time {
  font-size: 10px;
  text-align: right;
}

.chat-history {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 10px;
  flex-direction: row-reverse;
  flex-flow: column nowrap;
  font-size: 14px;
  overflow-y: auto;
  cursor: default;
}

.chat-history > :first-child {
  margin-top: auto !important;
}

.chat-history::-webkit-scrollbar {
  width: 4px;
}

.chat-history::-webkit-scrollbar-track {
  -webkit-border-radius: 10px;
  border-radius: 10px;
}

.chat-history::-webkit-scrollbar-thumb {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background: #00000030;
}

.messages {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  max-width: 100%;
}

.message {
  border-radius: 20px;
  padding: 8px 15px;
  margin-top: 5px;
  margin-bottom: 5px;
  display: inline-block;
  max-width: 90%;
}

.yours {
  align-items: flex-start;
}

.yours .message {
  margin-right: 10%;
  background-color: #eee;
  position: relative;
}

.yours .message.last:before {
  content: "";
  position: absolute;
  z-index: 0;
  bottom: 0;
  left: -7px;
  height: 20px;
  width: 20px;
  background: #eee;
  border-bottom-right-radius: 15px;
}

.yours .message.last:after {
  content: "";
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: -10px;
  width: 10px;
  height: 20px;
  background: $white;
  border-bottom-right-radius: 10px;
}

.mine {
  align-items: flex-end;
}

.mine .message {
  color: white;
  margin-left: 10%;
  background: linear-gradient(to bottom, #00d0ea 0%, #0085d1 100%);
  background-attachment: fixed;
  position: relative;
}

.mine .message.last:before {
  content: "";
  position: absolute;
  z-index: 0;
  bottom: 0;
  right: -8px;
  height: 20px;
  width: 20px;
  background: linear-gradient(to bottom, #00d0ea 0%, #0085d1 100%);
  background-attachment: fixed;
  border-bottom-left-radius: 10px;
}

.mine .message.last:after {
  content: "";
  position: absolute;
  z-index: 1;
  bottom: 0;
  right: -10px;
  width: 10px;
  height: 20px;
  background: $white;
  border-bottom-left-radius: 10px;
}

.date {
  width: 100%;
  text-align: center;

  span {
    background-color: #00000061;
    padding: 2px 20px;
    color: #ffffff;
    border-radius: 6px;
    font-size: 11px;
  }
}

.chat-footer {
  height: 54px;
  padding-top: 10px;
  display: flex;
  align-items: center;
  overflow: hidden;
}
</style>
