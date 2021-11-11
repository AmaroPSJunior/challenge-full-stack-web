<template>
  <Listing 
    @onNewUser="newUser" 
    @onEditUser="editUser" 
    :users="users"
    :listing="true"
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
        return store.state.users;
      },
    },

    data: () => ({}),

    created() {},

    methods: {
      async newUser(user) {
        await api.post('users', user);
        store.dispatch('getUsers');
      },

      async editUser(user) {
        await api.post('users', user);
        store.dispatch('getUsers');
      },
    }
  }
</script>
