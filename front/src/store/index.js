import Vue from 'vue';
import Vuex from 'vuex';
import api from '../services/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
  },
  mutations: {
    setUsers(state, setState) { state.users = setState },
  },
  actions: {
    async getUsers({commit}) {
      const response = await api.get('users');
      commit('setUsers', response.data);
    },
  },
  modules: {}
})
