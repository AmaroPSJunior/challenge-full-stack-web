<template>
  <listing 
    @newUser="newUser" 
    @editUser="editUser" 
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
        return store.state.users.filter(u => u.profile == this.authenticated.profile);
      },
    },

    data: () => ({}),

    created() {},

    methods: {
      async newUser(user) {
        await api.post('users', user);
        store.commit('getUsers');
      },

      async editUser(user) {
        console.log('editUser', user);
        await api.post('users', user);
        store.commit('getUsers');
      },

      async getUsers() {
        try {
          const response = await api.get('users', this.register);
          this.users = response.data;
        } catch (err) {
          console.log('🔴 err', err);
        }
      },
    }
  }
</script>
