import Vue from 'vue';
import Vuex from 'vuex';
import api from '../services/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: null,
    authenticated: null,
  },
  
  mutations: {
    async setUser(state, setState) { state.users = setState },
    async setAuthenticated(state, setState) { state.authenticated = setState },
  },

  actions: {
    async getUsers({ commit }) {
      const response = await api.get('users');
      commit('setUser', response.data);
    },
  },
  modules: {}
})
