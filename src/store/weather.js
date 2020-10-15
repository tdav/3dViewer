import browserStore from "../service/browserStore.js";

import axios from "../service/axios.js";
import tools from "../service/tools.js";

export default {
  state: {
    weatherData: {},
    weather: {
      dt: 0,
      main: {
        temp: 0,
        feels_like: 0,
        temp_min: 0,
        temp_max: 0,
        pressure: 0,
        sea_level: 0,
        grnd_level: 0,
        humidity: 0,
        temp_kf: 0
      },
      weather: [
        {
          id: 0,
          main: null,
          description: null,
          icon: null
        }
      ],
      clouds: { all: 0 },
      wind: { speed: 0, deg: 0 },
      visibility: 0,
      pop: 0,
      sys: { pod: null },
      dt_txt: null
    }
  },

  mutations: {
    setWeatherData(state, weatherData) {
      state.weatherData = weatherData;
      browserStore.setSession("weatherData", state.weatherData);
    },

    setWeather(state, weather) {
      state.weather = weather;
    }
  },

  actions: {
    async initWeatherData({ commit, dispatch }, load) {
      console.log("initWeatherData");
      if (load) {
        return await dispatch("loadWeatherData");
      } else {
        let local = browserStore.getSession("weatherData");
        let weather = getCorrectWeather(local);
        if (weather) {
          commit("setWeatherData", local);
          commit("setWeather", weather);

          tools.leftTime(() => {
            dispatch("initWeatherData");
          }, weather.dt_txt);

          return true;
        } else {
          return await dispatch("loadWeatherData");
        }
      }
    },

    async loadWeatherData({ commit, dispatch }) {
      console.log("loadWeatherData");
      try {
        let user = browserStore.getUser();
        let countryId = user.countryId || 1;
        const res = await axios.get(`weather/byid/${countryId}/ru`);
        let weather = getCorrectWeather(res.data);
        if (weather) {
          commit("setWeatherData", res.data);
          commit("setWeather", weather);

          tools.leftTime(() => {
            dispatch("initWeatherData");
          }, weather.dt_txt);
        }

        return true;
      } catch (e) {
        return false;
      }
    }
  },

  getters: {
    getWeather: state => state.weather
  }
};

function getCorrectWeather(weatherData) {
  if (!weatherData) return false;

  let now = new Date();
  now.setDate(now.getDate() + 1);
  var utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
  if (utc - new Date(weatherData.createDate) < 0) return false;

  if (!Array.isArray(weatherData.weather?.list)) return false;

  let list = weatherData.weather.list;
  let now2 = new Date();
  var utc2 = new Date(now2.getTime() + now2.getTimezoneOffset() * 60000);
  let weathers = list
    .filter(x => new Date(x.dt_txt) - utc2 > 0)
    .sort((a, b) => new Date(a.dt_txt) - new Date(b.dt_txt));

  return weathers.length ? weathers[0] : false;
}
