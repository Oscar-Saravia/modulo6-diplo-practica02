import axios from "axios";

const state = {
  clientList: []
};

const mutations = {
  SET_CLIENT_LIST(state, clients) {
    state.clientList = clients;
  }
};

const actions = {
  setClientList({ commit }, clients) {
    commit('SET_CLIENT_LIST', clients);
  },
  
  async fetchClients({ commit }) {
    try {
      const response = await axios.get(`${process.env.VUE_APP_API_URL}/clients`);
      commit('SET_CLIENT_LIST', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching clients:', error);
      throw error;
    }
  }
};

const getters = {
  clientList: state => state.clientList
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
