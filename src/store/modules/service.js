import axios from "axios";
const state = {
  serviceList: [],
};

const mutations = {
  SET_SERVICE_LIST(state, services) {
    state.serviceList = services;
  },
};

const actions = {
  setServiceList({ commit }, services) {
    commit("SET_SERVICE_LIST", services);
  },
  async fetchServices({ commit }, searchQuery) {
    return await axios
      .get(`${process.env.VUE_APP_API_URL}/services`)
      .then((response) => {
        commit("SET_SERVICE_LIST", response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  },
};

const getters = {
  serviceList: (state) => state.serviceList,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
