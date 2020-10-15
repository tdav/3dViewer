import * as signalR from "@microsoft/signalr";
import browserStore from "./browserStore.js";
import sysConfig from "../utils/sysConfig";
import chatTypes from "./chatTypes.js";
import messageTypes from "./messageTypes.js";

let connection = null;

export default store => {
  if (!("Notification" in window)) {
    console.log("This browser does not support desktop notification");
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(() => {});
  }

  if (connection && connection.connectionState == "Connected") {
    return connection;
  }

  let token = browserStore.getToken();

  connection = new signalR.HubConnectionBuilder()
    .withAutomaticReconnect(500)
    .configureLogging(signalR.LogLevel.Error)
    // .configureLogging(signalR.LogLevel.Debug)
    .withUrl(sysConfig.serverUrl + "/chatHub", {
      transport: signalR.HttpTransportType.WebSockets,
      accessTokenFactory: () => token
    })
    .build();

  connection.on("OnChatMessage", param => {
    debugger;
    if (param && param.id) {
      if (param.message && param.message.from.id != store.getters.getUser.id) {
        store.dispatch("setNewChat", param);
        const { from, message } = param.message;

        let title = "Глобальный чат";
        if (param.groupId != chatTypes.global) {
          let fullName = `${from.firstName} ${from.lastName}`;
          let isPrivate = param.groupId == chatTypes.private;
          title = isPrivate ? fullName : param.groupName;
        }

        let options = {
          body: message,
          badge: "/img/icons/apple-touch-icon-60x60.png",
          icon: "/img/icons/apple-touch-icon-60x60.png"
        };

        if (!("Notification" in window)) {
          console.log("This browser does not support desktop notification");
        } else if (Notification.permission === "granted") {
          // eslint-disable-next-line no-unused-vars
          const notification = new Notification(title, options);
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission(permission => {
            if (permission === "granted") {
              // eslint-disable-next-line no-unused-vars
              const notification = new Notification(title, options);
            }
          });
        }
      }
    }
  });

  connection.on("OnSystemCommand", param => {
    if (
      param.message?.type == messageTypes.system &&
      param.message?.message == "New Group"
    ) {
      store.dispatch("setNewGroup", param);
    }

    console.log("OnSystemCommand", param);
  });

  connection.start().then(() => {
    console.log("SignalR Connected.");
  });

  connection.onclose(error => {
    console.log("signalr close === " + error);

    // setTimeout(() => {
    //   connect();
    // }, 500);
  });

  return connection;
};
