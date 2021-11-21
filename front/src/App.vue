<template>
  <v-app>
    <modal :modalError="true" />
    <template v-if="userSelected">  
      <v-navigation-drawer app >
        <template v-slot:prepend>
          <v-list-item two-line>
            <v-list-item-avatar height="50" width="50">
                <v-icon size="100">{{ menu.find(m => m.title === userSelected.profile).icon }}</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ userSelected.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ userSelected.email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>

        <v-divider></v-divider>

        <v-list dense >
          <v-list-item
            v-for="(m, index) in [menu[0]]"
            :key="m.title"
            link
            @click="navigate(index)"
            ><template v-if="m.visible">
            <v-list-item-icon>
              <v-icon>{{ m.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ m.title }}</v-list-item-title>
            </v-list-item-content>
            </template>
          </v-list-item>

          <v-divider></v-divider>
          <v-list-item :href="apiDocs" target="_blank">
            <v-list-item-icon>
              <v-img :src="img" width="24px" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>api-docs</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list>
      </v-navigation-drawer>

      <v-app-bar app >
        {{ `Cadastro do ${userSelected.profile}` }}
      </v-app-bar>

      <v-main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-main>

      <v-footer app>
        grupo <h2>a</h2>
      </v-footer>
    </template>

    <v-container v-else>
      <v-card class="d-flex justify-space-around" height="100vh" flat>
        <CardUser 
          :menu="menu"
          :users="users" 
          @onRoot="root"
          @onSetUserSelected="setUserSelected"
        />
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import CardUser from './components/CardUser.vue';
import store from './store';
import swaggerImg from './assets/swagger.png'
import Modal from './components/Modal.vue';

export default {
  components: { CardUser, Modal, },
  name: 'App',
  props: {},

  computed: {
    users: function () {
      return store.state.users;
    },

    userSelected: function () {
      return store.state.authenticated;
    },

    img: function () {
      return swaggerImg;
    },
  },

  watch: {
    teste: function() {
      alert('teste')
    }
  },

  data: () => ({
    menu: [
      { title: 'início', icon: 'mdi-home-city', visible: true },
      { title: 'Administrador', icon: 'mdi-account', visible: true },
      { title: 'Aluno', icon: 'mdi-account-group-outline', visible: true },
    ],
    profileId: null,
    loading: false,
    studentSelected: null,
    idStudentSelected: null,
    apiDocs: 'http://localhost:3333/api-docs',
    iconMenuProfile: null,
  }),

  async mounted() {},

  async created() {
    await store.dispatch('getUsers');
  },

  methods: {
    navigate(id) {
      if (id == 0) this.setUserSelected(null);
    },
    
    reserve () {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },

    setUserSelected(user) {
      store.commit('setAuthenticated', user);
    },

    root(user) {
      store.commit('setAuthenticated', user);
    },

    selectedProfileSrtudent() {
      this.studentSelected = this.students.find(a => a.id == this.idStudentSelected);
    },
  } 
}
</script>
