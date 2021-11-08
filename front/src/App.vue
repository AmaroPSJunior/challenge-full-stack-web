<template >
  <v-app v-if="itemSelected">
    <v-navigation-drawer app >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar height="100" width="100">
              <v-icon size="100">{{ items[itemSelected].icon }}</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Jane Smith</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense >
        <v-list-item
          v-for="(item, index) in items"
          :key="item.title"
          link
          @click="navigate(index)"
        >
          <template v-if="item.visible">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      {{ items[itemSelected].title }}
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      grupo <h2>a</h2>
    </v-footer>
  </v-app>

  <v-app v-else>
    <v-container>
      <v-card 
        class="d-flex justify-space-around" 
        height="100vh" 
        flat
      >
        <v-card class="align-self-center " :loading="loading" max-width="374">
          <v-card-title @click="navigate(1)" dense>
            <v-list-item two-line>
              <v-list-item-avatar height="100" width="100">
                  <v-icon size="100">{{ items[1].icon }}</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  {{ admSelected && admSelected.name || 'Administrador' }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ admSelected && admSelected.email || 'Usuário Root'}}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>Área do Administradores</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-select 
              :items="administrators"
              item-value="id"
              item-text="name"
              v-model="idAdmSelected"
              @change="selectedItemAdm()"
              label="Outros Administradores"
            ></v-select>
          </v-card-text>
        </v-card>

        <v-card class="align-self-center" :loading="loading" max-width="374">
          <v-card-title @click="navigate(2)">
            <v-list-item two-line>
              <v-list-item-avatar height="100" width="100">
                  <v-icon size="100">{{ items[2].icon }}</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  {{ studentSelected && studentSelected.name || 'Selecione um Aluno' }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ studentSelected && studentSelected.email || '' }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>Área do Alunos</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-select
              :items="students"
              item-value="id"
              item-text="name"
              v-model="idStudentSelected"
              @change="selectedItemSrtudent()"
              label="Selecionar Aluno"
            ></v-select>
          </v-card-text>
        </v-card>

      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import api from './services/api';
import store from './store';

export default {
  name: 'App',

  props: {},

  computed: {
    administrators: function () {
      return store.state.users.filter(u => u.profile == 'Administrador');
    },

    students: function () {
      return store.state.users.filter(u => u.profile == 'Student');
    }
  },

  data: () => ({
    items: [
      { title: 'Home', icon: 'mdi-home-city', visible: true },
      { title: 'Administrador', icon: 'mdi-account', visible: true },
      { title: 'Alunos', icon: 'mdi-account-group-outline', visible: true },
    ],
    itemSelected: 0,
    profileId: null,
    loading: false,
    selection: 1,
    admSelected: null,
    idAdmSelected: null,
    studentSelected: null,
    idStudentSelected: null,
  }),

  async mounted() {
    // await store.dispatch('getUsers');
  },

  async created() {
    await store.dispatch('getUsers');
  },

  methods: {
    navigate(id) {
     this.itemSelected = id;
    },
    
    reserve () {
      this.loading = true
      setTimeout(() => (this.loading = false), 2000)
    },

    async getUsers() {
      try {
        const response = await api.get('users', this.register);
        if (response) {
          console.log('🔵 response', response.data)
        }
      } catch (err) {
        console.log('🔴 err', err);
      }
    },

    selectedItemAdm() {
      this.admSelected = this.administrators.find(a => a.id == this.idAdmSelected);
    },

    selectedItemSrtudent() {
      this.studentSelected = this.students.find(a => a.id == this.idStudentSelected);
    },
  } 
}
</script>
