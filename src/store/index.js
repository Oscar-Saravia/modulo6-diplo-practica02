import { createStore } from "vuex";
import client from "./modules/client";
import vehicle from "./modules/vehicle";
import mechanic from "./modules/mechanic";
import service from "./modules/service";
import axios from "axios";

export default createStore({
  state: {
    baseUrl: process.env.VUE_APP_API_URL,
    user: JSON.parse(localStorage.getItem('user')) || null,
    role: localStorage.getItem('role') || null, },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    SET_ROLE(state, role) {
      state.role = role;
      localStorage.setItem("role", role);
    },
    LOGOUT(state) {
      state.user = null;
      state.role = null;
      localStorage.removeItem("user");
      localStorage.removeItem("role");
    },
  },
  actions: {
    async login({ commit, state }, { email, password }) {
      try {
        const response = await axios.get(`${state.baseUrl}/users`, {
          params: { email, password },
        });

        if (response.data.length) {
          const user = response.data[0];
          commit("SET_USER", user);
          commit("SET_ROLE", user.role);
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    logout({ commit }) {
      commit("LOGOUT");
    },
  },
  getters: {
    getBaseUrl(state) {
      return state.baseUrl;
    },
    loged(state) {
      return state.user !== null;
    },
    role(state) {
      return state.role;
    },
    user(state) {
      console.log(state.user);
      return state.user;
    },
  },
  modules: {
    client,
    vehicle,
    mechanic,
    service,
  },
});
