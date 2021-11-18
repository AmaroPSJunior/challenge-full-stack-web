import Vue from 'vue';
import Vuex from 'vuex';
import api from '../services/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: null,
    authenticated: null,
    modalError: null,
  },
  
  mutations: {
    async setUser(state, setState) { state.users = setState },
    async setAuthenticated(state, setState) { state.authenticated = setState },
    async setModalError(state, setState) { state.modalError = setState },
  },

  actions: {
    async getUsers({ commit }) {
      const response = await api.get('users');
      commit('setUser', response.data);
    },
  },
  getters: {
    authenticated: state => state.authenticated,
    modalError: state => state.modalError,
  },
  modules: {}
})
