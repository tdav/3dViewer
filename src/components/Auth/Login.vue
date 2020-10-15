<script>
export default {
  data: () => ({
    isShowPass: false,
    login: {
      email: null,
      password: null
    }
  }),

  methods: {
    onLogin() {
      if (this.$refs.loginForm.validate()) {
        console.log(this.login);
        this.$store.dispatch("login", this.login).then(status => {
          if (status) {
            this.$emit("close");
          }
        });
      }
    }
  }
};
</script>

<template>
  <v-card class="px-3 pb-3">
    <v-card-title>
      Войти в систему
    </v-card-title>
    <v-card-text>
      <v-form ref="loginForm">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="login.email"
              prepend-inner-icon="mdi-account"
              hide-details
              outlined
              dense
              :rules="[$valid.req, $valid.email]"
              required
              autofocus
              placeholder="Эл. почта"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="login.password"
              prepend-inner-icon="mdi-lock"
              dense
              outlined
              name="password"
              placeholder="Пароль"
              :rules="[$valid.req]"
              required
              :append-icon="isShowPass ? 'mdi-eye' : 'mdi-eye-off'"
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
</template>
