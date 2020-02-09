<template>
  <div id="login">
    <div class="banner">
      <h1>Timetracer</h1>
    </div>
    <div class="card card-center card-small" v-if="!register">
      <h2 class="card-header">Login</h2>
      <input
        class="input-type input-text"
        type="text"
        placeholder="username"
        v-model="username"
      /><br />
      <input
        class="input-type input-text"
        type="password"
        placeholder="password"
        v-model="password"
        @keyup.enter="login()"
      /><br />
      <input
        class="input-type input-button"
        type="button"
        value="Login"
        @click="login()"
      /><br />
      <a href="#" class="subtle-link" @click.prevent="register = true">
        Register an account?
      </a>
    </div>
    <div class="card card-center card-small" v-else>
      <h2 class="card-header">Register</h2>
      <input
        class="input-type input-text"
        type="text"
        placeholder="username"
        v-model="username"
      /><br />
      <input
        class="input-type input-text"
        type="password"
        placeholder="password"
        v-model="password"
      /><br />
      <input
        class="input-type input-text"
        type="password"
        placeholder="confirm password"
        v-model="confirmPassword"
        @keyup.enter="doRegister()"
      /><br />
      <input
        class="input-type input-button"
        type="button"
        value="Register"
        @click="doRegister()"
      /><br />
      <a href="#" class="subtle-link" @click.prevent="register = false">Back to login</a>
    </div>
    <div class="notify-wrap">
      <div class="notify error" v-if="error != ''">{{ error }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      register: false,
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      error: ""
    };
  },
  methods: {
    login() {
      if (this.username != "" || this.password != "") {
        fetch(this.$store.state.server + "/login", {
          body: JSON.stringify({
            username: this.username,
            password: this.password
          }),
          headers: {
            "content-type": "application/json"
          },
          method: "POST"
        })
          .then(res => {
            return res.json();
          })
          .then(data => {
            if (data.status == "error") {
              //Throw error
              this.error = data.msg;
              return false;
            }
            localStorage.setItem("token", data.token);
            this.$store.commit("setLoginStatus", data);
            this.$router.push("/");
          })
          .catch(err => {
            this.error = err;
          });
      }
    },
    doRegister() {
      if (this.password !== this.confirmPassword) {
        this.error = "Passwords do not match";
        return false;
      }
      fetch(this.$store.state.server + "/register", {
        body: JSON.stringify({
          email: this.email,
          username: this.username,
          password: this.password
        }),
        headers: {
          "content-type": "application/json"
        },
        method: "POST"
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          if (data.status == "error") {
            //Throw error
            this.error = data.msg;
            return false;
          }
          this.register = false;
        })
        .catch(err => {
          this.error = err;
        });
    }
  }
};
</script>

<style></style>
