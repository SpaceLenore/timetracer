<template>
  <div id="login">
    <div class="banner">
      <h1>Timetracer</h1>
    </div>
    <div class="card card-small">
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
      /><br />
      <input
        class="input-type input-button"
        type="button"
        value="Login"
        @click="login()"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      if (this.username != "" || this.password != "") {
        //TODO: Login here
        alert("Hello " + this.username);
      }
    }
  }
};
</script>

<style></style>
