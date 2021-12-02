<template>
  <v-container>
    <v-card>
        <v-data-table
          :headers="headers"
          :items="filteredUsers"
          sort-by="name"
          class="elevation-1"
          :footer-props="footerProps"
          pageText="page teste"
          ><template v-slot:top>
            <v-toolbar flat flex-wrap>
              <v-col sm="8" md="6">
                <v-layout v-if="isAdministrator">
                  <v-toolbar-title style="padding-right:10px;">Filtrar por: </v-toolbar-title>
                  <v-select 
                    class="col col-sm-6 col-md-6"
                    :items="profileFilterList"
                    v-model="filterProfile"
                  ></v-select>
                </v-layout>
                <v-layout v-else>
                  <v-toolbar-title>{{ authenticated.name }}</v-toolbar-title>
                </v-layout>
              </v-col>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px" >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                    v-if="isAdministrator"
                    >+ Novo
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-form lazy-validation ref="formUser" slot="main-content">
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field 
                              v-model="editedUser.name" 
                              label="Nome"
                              :rules="nameRules"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field 
                              v-model="editedUser.email" 
                              label="Email"
                              :rules="emailRules"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field 
                              v-model="editedUser.ra" 
                              label="Ra"
                              type="number"
                              :rules="raRules"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field 
                              v-model="editedUser.cpf" 
                              label="CPF"
                              type="number"
                              :rules="cpfRules"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field 
                              v-model="editedUser.phone" 
                              label="Telefone"
                              type="number"
                              :rules="phoneRules"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-select 
                              :items="registrationFormProfile" 
                              v-model="editedUser.profile"
                              label="Perfil"
                              :rules="profileRules"
                              required
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="8" md="8" v-if="editedUser.created_at">
                                <v-text-field
                                  v-model="editedUser.created_at"
                                  label="Data Registro"
                                  readonly
                                  disabled
                                ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4" v-if="isAdministrator && !editedUser.active">
                            <v-switch v-model="editedUser.active" inset label="Ativo"></v-switch>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-container>
                  </v-card-text>

                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                    <v-btn color="blue darken-1" text @click="save">Salvar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5 justify-center" >Este Usuário será Deletado,</v-card-title>
                  <v-card-title class="text-h5 justify-center">tem certeza que deseja fazer isso?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">Confirmar</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:footer.page-text="items"> {{ items.pageStart }} - {{ items.pageStop }} de {{ items.itemsLength }} </template>'
          <template v-slot:item.active="{ item }">
            <v-simple-checkbox
              v-model="item.active"
              disabled
            ></v-simple-checkbox>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Atualizar</v-btn>
          </template>
        </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import store from '../store';
 
  export default {
    name: 'listing',
    props: {
      authenticated: { type: Object, required: true },
      users: { type: Array, require: true },
    },
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'Nome',         value: 'name',      sortable: false,  align: 'start' },
        { text: 'Email',        value: 'email'                                       },
        { text: 'CPF',          value: 'cpf'                                         },
        { text: 'RA',           value: 'ra'                                          },
        { text: 'Telefone',     value: 'phone'                                       },
        { text: 'Perfil',       value: 'profile'                                     },
        { text: 'Ativo',        value: 'active'                                      },
        { text: 'Ações',        value: 'actions',   sortable: false                  },
      ],
      footerProps: {
        options: {
          itemsPerPage: 10,
          page: 2,
          sortBy: ["teste1", "teste2"],
          sortDesc: [true],
          groupDesc: [true],
          // multiSort: true,
          // mustSort: true
        },
         1: 5,
        page: 2,
        itemsPerPageText: 'Linhas por página',
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-minus',
        nextIcon: 'mdi-plus',
      },
      editedIndex: -1,
      editedUser: {
        name: null,
        property: null,
        cpf: null,
        phone: null,
        profile: null,
        active: true,
      },
      defaultItem: {
        name: null,
        email: null,
        cpf: null,
        phone: null,
        perfil: null,
        active: true,
      },
      nameRules: [ 
        value => {
          const nameLength = 29;
          return (value && value.length > 0 && value.length <= nameLength) || `Deve ter entre 1 e ${nameLength} Caracteres`
        }
      ],
      emailRules: [
        value => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Email inválido',
        value => {
          const emailLength = 29;
          return (value && value.length > 0 && value.length <= emailLength) || `Deve ter entre 1 e ${emailLength} Caracteres`
        }
      ],
      raRules: [
        value => !!value || 'Ra inválido',
        value => {
          const raLength = 19;
          return (value && value.length > 0 && value.length <= raLength) || `Deve ter entre 1 e ${raLength} Caracteres`
        }
      ],
      cpfRules: [
        value => {
          const validate = cpf => checkAll(prepare(cpf));
          const notDig = i => !['.', '-', ' '].includes(i);
          const prepare = cpf => cpf.trim().split('').filter(notDig).map(Number);
          const is11Len = cpf => cpf.length === 11;
          const notAllEquals = cpf => !cpf.every(i => cpf[0] === i);
          const onlyNum = cpf => cpf.every(i => !isNaN(i));
          const calcDig = limit => (a, i, idx) => a + i * ((limit + 1) - idx);
          const somaDig = (cpf, limit) => cpf.slice(0, limit).reduce(calcDig(limit), 0);
          const resto11 = somaDig => 11 - (somaDig % 11);
          const zero1011 = resto11 => [10, 11].includes(resto11) ? 0 : resto11;
          const getDV = (cpf, limit) => zero1011(resto11(somaDig(cpf, limit)));
          const verDig = pos => cpf => getDV(cpf, pos) === cpf[pos];
          const checks = [is11Len, notAllEquals, onlyNum, verDig(9), verDig(10)];
          const checkAll = cpf => checks.map(f => f(cpf)).every(r => !!r);

          return value > 0 && validate(value) || 'CPF inválido'
        },
      ],
      phoneRules: [
        value => !!value || 'Telefone inválido',
        value => {
          const phoneLength = 19;
          return (value && value.length > 0 && value.length <= phoneLength) || `Deve ter entre 1 e ${phoneLength} Caracteres`
        }
      ],
      profileRules: [
        value => !!value || 'Selecione um Perfil',
      ],
      filterProfile: 'Todos',
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Novo Usuário' : 'Editar Usuário';
      },

      
      profileFilterList () {
        return ['Todos', 'Administrador', 'Aluno', 'Deletados']
      },

      registrationFormProfile() {
        return ['Administrador', 'Aluno']
      },

      filteredUsers () {
        if (this.filterProfile === 'Todos') return this.users;
        if (this.filterProfile === 'Deletados') return this.users.filter(u => !u.active);
        return this.users.filter(u => u.profile === this.filterProfile && u.active);
      },

      
      isAdministrator () {
        return this.authenticated.profile === 'Administrador'
      },

      pagination () {
        return store.state.pagination;
      },
    },

    watch: {
      dialog (val) { val || this.close(); },
      dialogDelete (val) { val || this.closeDelete(); },
    },

    methods: {
      initialize () {},

      editItem (item) {
        this.editedIndex = this.users.indexOf(item);
        this.editedUser = Object.assign({}, item);
        this.dialog = true;
      },

      deleteItem (item) {
        this.editedIndex = this.users.indexOf(item);
        this.editedUser = Object.assign({}, item);
        this.dialogDelete = true;
      },

      deleteItemConfirm () {
        this.editedUser.active = false;
        this.$emit('onDeleteUser', this.editedUser);
        this.closeDelete();
        console.log('🟢 active, isAdministrator', this.editedUser.active, this.isAdministrator );
        if(!this.editedUser.active && !this.isAdministrator) store.commit('setAuthenticated', null);
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedUser = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedUser = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        })
      },

      save () {
        if (this.$refs.formUser.validate()) {
          if (this.editedIndex > -1) {
            this.$emit('onEditUser', this.editedUser);   
          } else {
            this.$emit('onNewUser', this.editedUser);
          }
          this.close();
        }
      },

    },
  }
</script>

<style>
  .v-data-table__wrapper {
    overflow-y: auto !important;
    height: 300px !important;
  }
</style>