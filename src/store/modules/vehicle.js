import axios from "axios";
const state = {
    vehicleList: []
  };
  
  const mutations = {
    SET_VEHICLE_LIST(state, vehicles) {
      state.vehicleList = vehicles;
    }
  };
  
  const actions = {
    setVehicleList({ commit }, vehicles) {
      commit('SET_VEHICLE_LIST', vehicles);
    },
    async fetchVehicles({ commit }, searchQuery) {
      return await axios.get(`${process.env.VUE_APP_API_URL}/vehicles`)
        .then(response => {
          commit('SET_VEHICLE_LIST', response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };
  
  const getters = {
    vehicleList: state => state.vehicleList
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  };
  