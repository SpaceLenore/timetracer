<template>
  <div id="login">
    <div class="banner">
      <h1>Timetracer</h1>
    </div>
    <div class="card card-center card-small">
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
      />
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
      username: "",
      password: "",
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
          });
      }
    }
  }
};
</script>

<style></style>
