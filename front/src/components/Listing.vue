<template>
  <v-container>
    <v-card>
        <v-data-table
          :headers="headers"
          :items="filteredUsers"
          sort-by="name"
          class="elevation-1"
          ><template v-slot:top>
            <v-toolbar flat flex-wrap>
              <v-col sm="8" md="6">
                <v-layout v-if="isAdministrator">
                  <v-toolbar-title style="padding-right:10px;">Filtrar por: </v-toolbar-title>
                  <v-select class="col col-sm-6 col-md-6" :items="profiles" v-model="filterProfile"></v-select>
                </v-layout>
                <v-layout v-else>
                  <v-toolbar-title>{{ authenticated.name }}</v-toolbar-title>
                </v-layout>
              </v-col>
              <!-- <v-divider class="mx-4" inset vertical ></v-divider> -->
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
                              label="ra"
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
                              :validation="true"
                              :messages="checkCpf()"
                              :error="!cpfIsValid"
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
                              :items="profiles" 
                              v-model="editedUser.profile"
                              label="Perfil"
                              :rules="profileRules"
                              required
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="4" v-if="isAdministrator && filterProfile === 'Deletados'">
                            <v-switch v-model="editedUser.active" inset label="Ativo"></v-switch>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-container>
                  </v-card-text>

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
        { text: 'Dt. Entrada',  value: 'created_at'                                  },
        { text: 'Ativo',        value: 'active'                                      },
        { text: 'Ações',        value: 'actions',   sortable: false                  },
      ],
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
        value => !!value || 'Não pode ser vazio',
        value => (value && value.length > 0 && value.length <= 30) || 'Entre 1 e 30 Caracteres'
      ],
      emailRules: [
        value => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'CPF inválido',
        value => (value && value.length > 0 && value.length <= 30) || 'Entre 1 e 30 Caracteres',
      ],
      raRules: [
        value => value > 0 || 'Ra inválido',
      ],
      cpfRules: [
        value => value > 0 || 'CPF inválido',
      ],
      phoneRules: [
        value => !!value || 'Não pode ser vazio',
        value => (value && value.length > 0 && value.length <= 19) || 'Entre 1 e 19 Caracteres',
      ],
      profileRules: [
        value => !!value || 'Selecione um Perfil',
      ],
      cpfIsValid: false,
      filterProfile: 'Todos',
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Novo Usuário' : 'Editar Usuário';
      },

      profiles () {
        return ['Todos', 'Administrador', 'Aluno', 'Deletados']
      },

      filteredUsers () {
        if (this.filterProfile === 'Todos') return this.users;
        if (this.filterProfile === 'Deletados') return this.users.filter(u => !u.active);
        return this.users.filter(u => u.profile === this.filterProfile && u.active);
      },

      
      isAdministrator () {
        return this.authenticated.profile === 'Administrador'
      },
    },

    watch: {
      dialog (val) {
        val || this.close();
      },
      dialogDelete (val) {
        val || this.closeDelete();
      },
    },

    created () {},

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
        this.$emit('onDeleteUser', this.editedUser);
        this.closeDelete();
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
        this.checkCpf();
        if (this.$refs.formUser.validate()) {
          if (this.editedIndex > -1) {
            this.$emit('onEditUser', this.editedUser);
          } else {
            this.$emit('onNewUser', this.editedUser);
          }
          this.close();
        }
      },

      validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      },

      checkCpf() {      
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
        
        if (this.editedUser.cpf) {
          this.cpfIsValid = validate(this.editedUser.cpf);
        }
      },
    },
  }
</script>