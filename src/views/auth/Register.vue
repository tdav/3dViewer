<script>
import initStates from "../../store/initStates.js";

export default {
  data: vm => ({
    isShowPass: false,
    citys: [],
    searchCitys: null,
    register: {
      firstName: "",
      lastName: "",
      countryId: 0,
      cityId: 0,
      email: "",
      password: ""
    },
    loading: false,

    rePassword: null,
    rePassRule: v => !v || v == vm.register.password || "Пароли не совпадают",
    minLength6: v => !v || v?.length >= 6 || "Минимальное количество символов 6"
  }),

  computed: {
    countrys: vm => vm.$store.getters.getCountrys
    // citys: vm => vm.$store.getters.getCitysByCountry
  },

  created() {
    this.$store.dispatch("initCountrys");
  },

  watch: {
    searchCitys(value) {
      if (this.citys.length > 0) return;

      if (this.loading) return;
      if (value?.trim() && value.length > 1) {
        this.loading = true;

        this.axios
          .get(`city/search_city/${value}`)
          .then(res => {
            this.citys = res.data;
          })
          .finally(() => (this.loading = false));
      }
    }
  },

  methods: {
    onRegister() {
      if (this.$refs.registerForm.validate()) {
        this.$store.dispatch("register", this.register).then(status => {
          if (status) {
            initStates(this.$store);
            this.$router.push("/home");
          }
        });
      }
    },

    getCitys() {
      if (this.loading) return;
      this.$store
        .dispatch("initCitysByCountry", this.register.countryId)
        .then(() => {})
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<template>
  <div
    style="display: flex;align-items: center;justify-content: center;height: 100%;"
  >
    <div>
      <v-card width="650" class="px-3 pb-3">
        <v-card-title>
          Регистрация
        </v-card-title>
        <v-card-text>
          <v-form ref="registerForm">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="register.firstName"
                  hide-details
                  label="Имя"
                  outlined
                  dense
                  :rules="[$valid.req]"
                  required
                  autofocus
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="register.lastName"
                  hide-details
                  outlined
                  label="Фамилия"
                  dense
                  :rules="[$valid.req]"
                  required
                />
              </v-col>
              <v-col cols="6">
                <v-select
                  :items="countrys"
                  item-text="name"
                  item-value="id"
                  outlined
                  dense
                  hide-details
                  name="countryId"
                  v-model="register.countryId"
                  label="Страна"
                  :rules="[$valid.req]"
                  required
                />
              </v-col>
              <v-col cols="6">
                <v-autocomplete
                  :disabled="!register.countryId"
                  :search-input.sync="searchCitys"
                  hide-no-data
                  outlined
                  :loading="loading"
                  :items="citys"
                  item-text="name"
                  item-value="id"
                  dense
                  hide-details
                  name="cityId"
                  v-model="register.cityId"
                  label="Город"
                  :rules="[$valid.req]"
                  required
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="register.email"
                  autocomplete="off"
                  hide-details
                  outlined
                  dense
                  :rules="[$valid.req]"
                  required
                  label="Эл. почта"
                />
              </v-col>
              <v-col cols="6" />
              <v-col cols="6">
                <v-text-field
                  autocomplete="off"
                  label="Пароль"
                  v-model="register.password"
                  prepend-inner-icon="mdi-lock"
                  dense
                  outlined
                  name="password"
                  :rules="[$valid.req, minLength6]"
                  required
                  :append-icon="isShowPass ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="isShowPass ? 'text' : 'password'"
                  @click:append="isShowPass = !isShowPass"
                  @keyup.enter="onLogin"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Подтвердите пароль"
                  v-model="rePassword"
                  prepend-inner-icon="mdi-lock-check"
                  dense
                  outlined
                  name="confirm"
                  :rules="[$valid.req, rePassRule, minLength6]"
                  required
                  :append-icon="isShowPass ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="isShowPass ? 'text' : 'password'"
                  @click:append="isShowPass = !isShowPass"
                  @keyup.enter="onLogin"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn @click="onRegister" tabindex="1" block color="primary">
            Регистрация
          </v-btn>
        </v-card-actions>
      </v-card>

      <div class="text-right pt-4">
        У вас есть аккаунт
        <router-link to="/">Войдите в систему</router-link>
      </div>
    </div>
  </div>
</template>
