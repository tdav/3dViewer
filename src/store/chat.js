import axios from "../service/axios.js";
import chatTypes from "../service/chatTypes.js";
// import i18n from "../i18n.js";

export default {
  state: {
    chats: [],
    searchUsers: [],
    searchUsersAddGroup: [],
    messages: [],
    selectedChat: {},
    selectedUser: {},
    searchUserName: ""
  },

  mutations: {
    initChats(state, chats) {
      state.chats = chats.map(chat => mapToChat(chat));
    },

    setNewChat(state, newChat) {
      let from = newChat.message?.from ? newChat.message?.from : {};
      let isPrivate = newChat.groupId == chatTypes.private;

      let chat = {
        groupId: newChat.groupId,
        groupName: newChat.groupName,
        avatar: isPrivate ? from.faceImageUrl : newChat.groupIconUrl,
        name: isPrivate ? getFullName(from) : newChat.groupName,
        userId: isPrivate ? from.id : -1,
        email: isPrivate ? from.email : null,
        online: isPrivate ? from.online : null,
        lastLoginDate: isPrivate ? from.lastLoginDate : null,
        username: isPrivate ? from.username : null
      };

      if (chat.groupId == chatTypes.global) {
        if (state.selectedChat.groupId == chat.groupId && newChat.message) {
          state.messages.push(newChat.message);
        }
      } else if (chat.groupId == chatTypes.private) {
        let oldChat = state.chats.find(
          c => c.groupId == chatTypes.private && c.userId == chat.userId
        );

        if (oldChat) {
          state.chats = state.chats.map(curChat => {
            if (
              curChat.groupId == chatTypes.private &&
              curChat.userId == oldChat.userId
            ) {
              if (state.selectedChat.userId == chat.userId && newChat.message) {
                let old = state.messages.find(x => x.id == newChat.message.id);
                if (!old) {
                  state.messages.push(newChat.message);
                }
              }

              return chat;
            }

            return curChat;
          });
        } else {
          state.chats.unshift(chat);
        }
      } else {
        let oldGroup = state.chats.find(c => c.groupId == chat.groupId);
        if (oldGroup) {
          state.chats = state.chats.map(curChat => {
            if (curChat.groupId == oldGroup.groupId) {
              if (
                state.selectedChat.groupId == chat.groupId &&
                newChat.message
              ) {
                state.messages.push(newChat.message);
              }

              return chat;
            }

            return curChat;
          });
        } else {
          state.chats.unshift(chat);
        }
      }
    },

    setNewGroup(state, newGroup) {
      let chat = {
        groupId: newGroup.groupId,
        groupName: newGroup.groupName,
        avatar: newGroup.groupIconUrl,
        name: newGroup.groupName,
        userId: -1
      };

      let oldGroup = state.chats.find(c => c.groupId == chat.groupId);
      if (oldGroup) {
        state.chats = state.chats.map(curChat => {
          if (curChat.groupId == oldGroup.groupId) {
            if (state.selectedChat.groupId == chat.groupId) {
              // let msg = {
              // }
              // state.messages.push(msg);
            }

            return chat;
          }

          return curChat;
        });
      } else {
        state.chats.unshift(chat);
      }
    },

    sendedMessage(state, { value, chat }) {
      if (chat.groupId == chatTypes.global) {
        if (state.selectedChat.groupId == chat.groupId && value.message) {
          state.messages.push(value.message);
        }
      } else if (chat.groupId == chatTypes.private) {
        let oldChat = state.chats.find(
          c => chat.groupId == chatTypes.private && c.userId == chat.userId
        );
        if (oldChat) {
          state.chats = state.chats.map(curChat => {
            if (
              curChat.userId == oldChat.userId &&
              state.selectedChat.userId == chat.userId &&
              value.message
            ) {
              state.messages.push(value.message);
            }

            return curChat;
          });
        } else {
          state.chats.unshift(chat);
        }
      } else {
        let oldGroup = state.chats.find(c => c.groupId == chat.groupId);
        if (oldGroup) {
          state.chats = state.chats.map(curChat => {
            if (
              curChat.groupId == oldGroup.groupId &&
              state.selectedChat.groupId == chat.groupId &&
              value.message
            ) {
              state.messages.push(value.message);
            }

            return curChat;
          });
        } else {
          state.chats.unshift(chat);
        }
      }
    },

    setSearchUsers(state, searchUsers) {
      searchUsers = Array.isArray(searchUsers) ? searchUsers : [];
      state.searchUsers = searchUsers.map(x => {
        x.title = getFullName(x);
        x.avatar = x.faceImageUrl;
        return x;
      });
    },

    initMessages(state, messages) {
      state.messages = Array.isArray(messages) ? messages : [];
    },

    setSelectedChat(state, selectedChat) {
      state.selectedChat = selectedChat;
    },

    setSelectedUser(state, selectedUser) {
      state.selectedUser = selectedUser;
    },

    setSearchUserName(state, searchUserName) {
      state.searchUserName = searchUserName;
    },

    setSearchUsersAddGroup(state, searchUsers) {
      if (!Array.isArray(searchUsers) || !searchUsers.length) {
        state.searchUsersAddGroup = [];
        return;
      }

      let a = searchUsers.map(x => {
        x.title = getFullName(x);
        x.avatar = x.faceImageUrl;
        return x;
      });

      if (state.searchUsersAddGroup.length) {
        a.forEach(e => {
          let old = state.searchUsersAddGroup.find(x => x.id == e.id);
          if (!old) {
            state.searchUsersAddGroup.unshift(e);
          }
        });

        state.searchUsersAddGroup = [...state.searchUsersAddGroup];
      } else {
        state.searchUsersAddGroup = a;
      }
    }
  },

  actions: {
    async searchUsers({ commit }, value) {
      let param = {
        value: value
      };

      try {
        const res = await axios.post("contacts/get_search", param);

        commit("setSearchUsers", res.data);
        return true;
      } catch (e) {
        // let err = e.response;
        // if (err && err.data) {
        //   commit("setSnkMsg", {
        //     text: i18n.t("Invalid email or password!")
        //   });
        // }
        return false;
      }
    },

    async searchUsersAddGroup({ commit }, value) {
      let param = {
        value: value
      };

      try {
        const res = await axios.post("contacts/get_search", param);

        commit("setSearchUsersAddGroup", res.data);
        return true;
      } catch (e) {
        // let err = e.response;
        // if (err && err.data) {
        //   commit("setSnkMsg", {
        //     text: i18n.t("Invalid email or password!")
        //   });
        // }
        return false;
      }
    },

    setSearchUsers({ commit }, arr) {
      commit(arr ? "setSelectedChat" : "setSelectedUser", {});
      commit("setSearchUsers", arr);
    },

    setSearchUsersAddGroup({ commit }, arr) {
      commit("setSearchUsers", arr);
    },

    async initChats({ commit }) {
      try {
        const res = await axios.post("contacts/get_chats");

        commit("initChats", res.data);
        return true;
      } catch (e) {
        // let err = e.response;
        // if (err && err.data) {
        //   commit("setSnkMsg", {
        //     text: i18n.t("Invalid email or password!")
        //   });
        // }
        return false;
      }
    },

    async setSelectedChat({ commit }, selectedChat) {
      if (selectedChat && selectedChat.id) {
        commit("setSelectedChat", selectedChat);
        let param = {
          userId: selectedChat.userId,
          groupId: selectedChat.groupId,
          pageIndex: 0
        };

        try {
          const res = await axios.post("messages/get_mesages", param);
          commit("initMessages", Array.isArray(res.data) ? res.data : []);
          return true;
        } catch (e) {
          // let err = e.response;
          // if (err && err.data) {
          //   commit("setSnkMsg", {
          //     text: i18n.t("Invalid email or password!")
          //   });
          // }

          return false;
        }
      } else {
        commit("setSelectedChat", {});
      }
    },

    setSelectedUser({ commit }, selectedUser) {
      if (selectedUser && selectedUser.id) {
        commit("setSelectedUser", selectedUser);
        commit("initMessages");
      } else {
        commit("setSelectedUser", {});
      }
    },

    setNewChat({ commit }, chat) {
      commit("setNewChat", chat);
    },

    setNewGroup({ commit }, chat) {
      commit("setNewGroup", chat);
    },

    sendedMessage({ commit }, payload) {
      commit("sendedMessage", payload);
    },

    setSearchUserName({ commit }, searchUserName) {
      commit("setSearchUserName", searchUserName);
    }
  },

  getters: {
    getSearchUsers: store => store.searchUsers,
    getSearchUsersAddGroup: store => store.searchUsersAddGroup,
    getMessages: store => store.messages,
    getSelectedChat: store => store.selectedChat,
    getSelectedUser: store => store.selectedUser,
    getSearchUserName: store => store.searchUserName,
    getChats: state => state.chats
  }
};

function mapToChat(chat) {
  let isPrivate = chat.groupId == chatTypes.private;
  // chat.unReadsCount = 0;
  chat.name = isPrivate ? getFullName(chat) : chat.name;
  chat.avatar = isPrivate ? chat.faceImageUrl : chat.iconUrl;
  return chat;
}

function getFullName(user) {
  return `${user.firstName} ${user.lastName}`;
}
