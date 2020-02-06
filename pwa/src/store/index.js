import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: undefined,
    token: localStorage.getItem("token") || undefined,
    server: process.env.API || "//localhost:8000"
  },
  mutations: {
    setLoginStatus(state, payload) {
      state.username = payload.username;
      state.token = payload.token;
    },
    unsetLoginStatus(state) {
      state.username = undefined;
      state.token = undefined;
    }
  },
  actions: {},
  modules: {}
});
