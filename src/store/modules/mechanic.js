import axios from "axios";

const state = {
  mechanicList: []
};

const mutations = {
  SET_MECHANIC_LIST(state, mechanics) {
    state.mechanicList = mechanics;
  }
};

const actions = {
  setMechanicList({ commit }, mechanics) {
    commit('SET_MECHANIC_LIST', mechanics);
  },
  
  async fetchMechanics({ commit }) {
    try {
      const response = await axios.get(`${process.env.VUE_APP_API_URL}/mechanics`);
      commit('SET_MECHANIC_LIST', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching mechanics:', error);
      throw error;
    }
  }
};

const getters = {
  mechanicList: state => state.mechanicList
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
