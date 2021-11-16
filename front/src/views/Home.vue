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
        const response = await api.post('users', user);
        response.status === 201 ? alert(`Criado com sucesso!`) : null;
        store.dispatch('getUsers');
      },

      async editUser(user) {
        const response = await api.post('users', user);
        response.status === 201 ? alert(`Atualizado com sucesso!`) : null;
        await api.post('users', user);
        store.dispatch('getUsers');
      },
      
      async deleteUser(user) {
        user.active = false;
        const response = await api.post('users', user);
        response.status === 201 ? alert(`Desativado com sucesso!`) : null;
        store.dispatch('getUsers');
      },
       
    }
  }
</script>
