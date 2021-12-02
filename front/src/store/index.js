import Vue from 'vue';
import Vuex from 'vuex';
import api from '../services/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: null,
    pagination: null,
    authenticated: null,
    modalError: null,
    modalSuccess: null,
  },
  
  mutations: {
    setUser(state, setState) { state.users = setState },
    setPagination(state, setState) { state.pagination = setState },
    setAuthenticated(state, setState) { state.authenticated = setState },
    setModalError(state, setState) { state.modalError = setState },
    setModalSuccess(state, setState) { state.modalSuccess = setState },
  },

  actions: {
    async getUsers({ commit }, pagination) {
      try {
        const response = await api.get('users', { params: pagination });
        commit('setUser', response.data.users);
        commit('setPagination', response.data.pagination);
      } catch (error) {
        commit('setModalError', { error: true, message: error });
      }
    },
  },
  getters: {
    authenticated: state => state.authenticated,
    modalError: state => state.modalError,
    modalSuccess: state => state.modalSuccess,
  },
  modules: {}
})
