const isPro = process.env.NODE_ENV != "production";

export default {
  serverUrl: isPro ? "https://api.viralax.online" : "http://localhost:7701",
  filesUrl: "",
  // serverUrl: "http://192.168.0.111:44303",
  // filesUrl: "http://192.168.0.106:44303/store",
  localStoreVersion: "0.0.1"
};
