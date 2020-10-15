<script>
export default {
  components: {},

  data: () => ({
    isShow: true
  }),

  computed: {
    weather: vm => vm.$store.getters.getWeather,
    inWeather: vm => (vm.weather.weather.length ? vm.weather.weather[0] : {})
  },

  methods: {
    getIcon(icon) {
      return `/weather/${icon}@2x.png`;
    }
  }
};
</script>

<template>
  <div>
    <div :class="isShow && 'weather-show'" class="weather" v-if="isShow">
      <div @click="isShow = !isShow" class="weather-swich">
        <i class="mdi mdi-chevron-left"></i>
      </div>
      <div class="w-header">
        <img
          v-if="inWeather.icon"
          class="w-header-icon"
          :src="getIcon(inWeather.icon)"
          alt="w-header-icon"
        />
        <div class="w-header-grade">
          {{ weather.main.temp }} <span class="w-header-unit">°C</span>
        </div>
        <div class="w-header-phrase">
          {{ inWeather.description }}
        </div>
      </div>
      <div class="w-body">
        <div class="w-body-row">
          <div>Видимость</div>
          <span>{{ weather.visibility / 1000 }} км</span>
        </div>
        <div class="w-body-row">
          <div>Ветер</div>
          <span>{{ weather.wind.speed }} м/c</span>
        </div>
        <div class="w-body-row">
          <div>Влажность</div>
          <span>{{ weather.main.humidity }} %</span>
        </div>
        <div class="w-body-row">
          <div>Давление</div>
          <span>{{ weather.main.pressure }} hPa</span>
        </div>
      </div>
    </div>
    <div @click="isShow = !isShow" class="weather-swich" v-else>
      <i class="mdi mdi-chevron-right"></i>
    </div>
  </div>
</template>

<style scoped lang="scss">
.weather-swich {
  position: absolute;
  top: 70px;
  z-index: 2;
  background-color: #ffffff73;
  color: white;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  width: 10px;
  height: 30px;
  transition: all 0.2s;
  align-items: center;
  justify-content: center;
  display: flex;
  cursor: pointer;
}

.weather-swich:hover {
  width: 15px;
}

.weather {
  transition: all 0.2s;
  position: absolute;
  left: -500px;
  top: 70px;
  z-index: 2;
  background-color: #ffffff73;
  color: white;
  width: 200px;
  height: 270px;
  border-radius: 15px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .w-header {
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    line-height: 100%;
    font-size: 30px;
    .w-header-grade {
      position: relative;
      .w-header-unit {
        position: absolute;
        top: 0;
        font-size: 16px;
        padding-left: 2px;
        line-height: 16px;
      }
    }

    .w-header-icon {
      width: 90px;
      position: absolute;
      top: -15px;
      right: 0px;
    }

    .w-header-phrase {
      font-size: 14px;
      text-transform: capitalize;
    }
  }

  .w-body {
    font-size: 12px;
  }

  .w-body-row {
    display: flex;
    justify-content: space-between;
  }

  .weather-swich {
    position: absolute;
    top: 5px;
    // left: -20px;
    left: 0px;
    transition: all 0.3s;
    width: 20px;
    i {
      cursor: pointer;
    }
  }
}

// .weather:hover {
//   .weather-swich {
//     left: 0px;
//   }
// }

.weather.weather-show {
  left: 10px;
}
</style>
