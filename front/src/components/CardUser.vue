<template>
  <div class="align-self-center">
    <v-card width="374">
      <v-card-title 
        dense 
        v-if="idUserSelected"
        :class="{'selected': idUserSelected}"
        @click="selectUserAuthenticate" 
      >
        <v-list-item two-line>
          <v-list-item-avatar height="100" width="100">
              <v-icon size="100">{{ menuSelected && menuSelected.icon }}</v-icon>
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
        {{ menuSelected && menuSelected.title }}
      </v-card-title>
    </v-card>

    <v-card class="mt-15" width="374">       
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
  </div>
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
      const m = this.menu && this.userSelected && this.userSelected.profile ? this.menu.find(m => m.title === this.userSelected.profile) : {};
      return m;
    },

    listUsers: function () {
      return this.users;
    },
  },

  data: () => ({
    idUserSelected: null,
    userSelected: null,
    loading: false,
    menuActive: null,
  }),

  watch: {
    idUserSelected: function(val) {
      this.userSelected = this.users.find(u => u.id.includes(val))
      this.menuActive = this.menu ? this.menu.find(m => m.title === this.userSelected.profile) : {};
    }
  },
  
  methods: {
    selectUserAuthenticate() {
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