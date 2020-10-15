<script>
import initStates from "../../store/initStates.js";

export default {
  data: () => ({
    isShowPass: false,
    login: {
      email: null,
      password: null
    }
  }),

  created() {
    let token = this.$bStore.getBearerToken();
    if (token) {
      this.$router.push("/home");
    }
  },

  methods: {
    onLogin() {
      if (this.$refs.loginForm.validate()) {
        this.$store.dispatch("login", this.login).then(status => {
          if (status) {
            initStates(this.$store);
            this.$router.push("/home");
          }
        });
      }
    }
  }
};
</script>

<template>
  <div
    style="display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;"
  >
    <div>
      <v-card width="500" class="px-3 pb-3">
        <v-card-title>
          Войти в систему
        </v-card-title>
        <v-card-text>
          <v-form ref="loginForm">
            <v-row>
              <v-col cols="12">
                <div class="pb-1">
                  Эл. почта
                </div>
                <v-text-field
                  v-model="login.email"
                  prepend-inner-icon="mdi-account"
                  hide-details
                  outlined
                  dense
                  :rules="[$valid.req, $valid.email]"
                  required
                  placeholder="Вводите Ваше эл. почту"
                  autofocus
                />
              </v-col>
              <v-col cols="12">
                <div class="pb-1">
                  Пароль
                </div>
                <v-text-field
                  v-model="login.password"
                  prepend-inner-icon="mdi-lock"
                  dense
                  outlined
                  name="password"
                  :rules="[$valid.req]"
                  required
                  placeholder="Вводите Ваше пароль"
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
          <v-btn @click="onLogin" tabindex="1" block color="primary">
            Вход
          </v-btn>
        </v-card-actions>
      </v-card>

      <div class="text-right pt-4">
        У вас нет аккаунт
        <router-link to="/register">Регистрация</router-link>
      </div>
    </div>
  </div>
</template>
