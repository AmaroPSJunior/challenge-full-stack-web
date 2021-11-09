import Vue from 'vue';
import Vuex from 'vuex';
import api from '../services/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    administrator: [],
    student: [],
    authenticated: {},
  },
  
  mutations: {
    async setUser(state, setState) { state.users = setState },
    async setAdministrador(state, setState) { state.administrator = setState },
    async setStudent(state, setState) { state.student = setState },
    async setauthenticated(state, setState) { state.authenticated = setState },
  },

  actions: {
    async getUsers({ commit }) {
      const response = await api.get('users');
      commit('setUser', response.data);
      commit('setStudent', response.data.filter(u => u.profile == 'Aluno'));
      commit('setAdministrador', response.data.filter(u => u.profile == 'Administrador'));
    },
  },
  modules: {}
})
