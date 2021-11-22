<template>
  <Listing 
    @onNewUser="newUser" 
    @onEditUser="editUser"
    @onDeleteUser="deleteUser"
    :users="users"
    :authenticated="authenticated"
  />
</template>

<script>
  import Listing from '../components/Listing.vue';
  import api from '../services/api';
  import store from '../store';

  export default {
    name: 'Home',

    components: {
      Listing,
    },

    computed: {
      authenticated: function () {
        return store.state.authenticated;
      },
      
      users: function () {
        if (this.authenticated.profile === 'Administrador') {
          return store.state.users;
        }

        return store.state.users.filter(u => u.id === this.authenticated.id);
      },
    },

    data: () => ({}),

    created() {},

    methods: {
      async newUser(user) {
        try {
          const response = await api.post('users', user);
          if(response.status == 201) {
            store.commit('setModalSuccess', { 
              message: `${user.profile} criado com sucesso!` 
            });
          }
          store.dispatch('getUsers');
        } catch (error) {
          store.commit('setModalError', { error: true, message: error });
        }
      },

      async editUser(user) {
        try {
          const response = await api.post('users', user);
          if(response && response.status == 200) {
            store.commit('setModalSuccess', {
              success: true,
              message: `${user.profile} atualizado com sucesso!` 
            });
            this.$nextTick();
          }
          store.dispatch('getUsers');
        } catch (error) {
          store.commit('setModalError', { error: true, message: error });
        }
      },
      
      async deleteUser(user) {
        try {
          user.active = false;
          const response = await api.post('users', user);
          if(response.status === 200) {
            store.commit('setModalSuccess', {
              success: true,
              message: `${user.profile} desativado com sucesso!` 
            });
          }
          store.dispatch('getUsers');
        } catch (error) {
          store.commit('setModalError', { error: true, message: error });
         }
      },
       
    }
  }
</script>
