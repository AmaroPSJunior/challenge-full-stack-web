<template>
  <listing 
    @newUser="newUser" 
    @editUser="editUser" 
    :listing="true"
    :Administrator="Administrator"
  />
</template>

<script>
  import Listing from '../components/Listing.vue';
  import api from '../services/api';
// import store from '../store';

  export default {
    name: 'Home',

    components: {
      Listing,
    },

    data: () => ({}),

    methods: {
      newUser(user) {
        console.log('newUser', user);
      },

      editUser(user) {
        console.log('editUser', user);
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
