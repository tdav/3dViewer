import browserStore from "../service/browserStore.js";

export default store => {
  const actions = [
    {
      auth: true,
      action: "initUser"
    },
    {
      auth: true,
      action: "initWeatherData"
    },
    {
      auth: true,
      action: "initUserTickers"
    }
  ];

  let token = browserStore.getBearerToken();
  actions.forEach(action => {
    if (!action.auth || token) {
      store.dispatch(action.action);
    }
  });
};
