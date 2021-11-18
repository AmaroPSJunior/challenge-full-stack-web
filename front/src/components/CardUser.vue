<template>
  <v-card class="align-self-center" :loading="loading" max-width="374">
    <v-card-title 
      dense 
      v-if="idUserSelected"
      :class="{'selected': idUserSelected}"
      @click="selectUserAuthenticate" 
    >
      <v-list-item two-line>
        <v-list-item-avatar height="100" width="100">
            <v-icon size="100">{{ menuSelected && menuSelected.icon || menuStandard.icon }}</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ userSelected && userSelected.name || 'Sem Usuário' }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ userSelected && userSelected.email }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      {{ menuSelected && menuSelected.title || menuStandard.title }}
    </v-card-title>
    <template>
      <v-divider></v-divider>
      <v-card-text>
        <v-select 
          label="Selecione um Usuário"
          item-value="id"
          item-text="name"
          v-model="idUserSelected"
          :items="listUsers"
        ></v-select>
      </v-card-text>
    </template>
  </v-card>
</template>

<script>

export default {
  name: 'card-user',
  props: {
    users: { type: Array, default: null },
    menu: { type: Array, default: null },
  },
  computed: {
    menuSelected: function () {
      return this.menu && this.userSelected && this.userSelected.profile ? this.menu.find(m => m.title === this.userSelected.profile) : this.menuStandard;
    },

    listUsers: function () {
      return this.users ? this.users : [];
    },
  },
  data: () => ({
    menuStandard: { title: 'Sem Usuário Selecionado', icon: 'mdi-account', visible: true },
    idUserSelected: null,
    userSelected: null,
    loading: false,
  }),

  watch: {
    idUserSelected: function(val) {
      this.userSelected = this.users.find(u => u.id.includes(val))
      // this.$emit('onSetUserSelected', this.userSelected);
      
      this.menuSelected = this.menu ? this.menu.find(m => m.title === this.userSelected.profile) : this.menuStandard;
    }
  },
  
  methods: {
    selectUserAuthenticate() {
      // if(!this.users) {
      //   this.$emit('onRoot');
      //   return;
      // }
      
      if (!this.userSelected) {
        alert("Selecione uma Usuário");
      }
      this.$emit('onSetUserSelected', this.userSelected);
    },

  } 
}
</script>

<style lang="scss" scoped>

.selected {
  cursor: pointer; 
  box-shadow: 0px 5px 5px -3px rgb(25 118 210 / 50%), 0px 8px 10px 1px rgb(25 118 210 / 50%), 0px 3px 14px 2px rgb(25 118 210 / 50%);
  border: solid 1px rgb(25 118 210 / 50%);
   &:hover {
     background-color: rgb(25 118 210 / 50%);
   }
}

</style>