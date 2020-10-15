<script>
export default {
  props: {
    deadline: {
      type: Number,
      required: false
    },

    view: {
      type: Boolean,
      default: () => true
    },

    showDays: {
      type: Boolean,
      default: () => true
    }
  },

  data: vm => ({
    currentTime: null,
    countDownDate: vm.deadline
  }),

  mounted() {
    this.countdown();
  },

  methods: {
    countdown() {
      let nowUtc = this.getDateUtc();
      let total = this.countDownDate - nowUtc;

      if (this.countDownDate > 0) {
        if (total > 0) {
          if (this.view) {
            let seconds = Math.floor((total / 1000) % 60);
            let minutes = Math.floor((total / 1000 / 60) % 60);
            let hours = Math.floor((total / (1000 * 60 * 60)) % 24);
            let days = Math.floor(total / (1000 * 60 * 60 * 24));

            this.currentTime = {
              total,
              days,
              hours,
              minutes,
              seconds
            };
          }
          setTimeout(this.countdown, 1000);
        } else {
          this.currentTime = null;
          this.$emit("timeEnd");
        }
      }
    },

    timerView() {
      const { days, hours, minutes, seconds } = this.currentTime;
      const viDays = this.showDays ? `${sl(days)}:` : "";

      return `${viDays}${sl(hours)}:${sl(minutes)}:${sl(seconds)}`;

      function sl(value) {
        return value ? `0${value}`.slice(-2) : "00";
      }
    },

    getDateUtc() {
      let now = new Date();
      let nowUtc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
      return nowUtc.getTime();
    }
  }
};
</script>

<template>
  <div v-if="view">
    <div v-if="currentTime">
      {{ timerView() }}
    </div>
    <div v-else>{{ showDays ? "00:" : "" }}00:00:00</div>
  </div>
</template>
