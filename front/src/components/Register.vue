<template>
  <v-container>

    <v-card>
      <v-card-text>
      
          <validation-observer
            ref="observer"
            v-slot="{ invalid }"
          >
            <form @submit.prevent="submit">
              <validation-provider
                v-slot="{ errors }"
                name="Nome"
                rules="required|max:50"
              >
                <v-text-field
                  v-model="register.name"
                  :counter="50"
                  :error-messages="errors"
                  label="Nome"
                  required
                ></v-text-field>
              </validation-provider>

              <validation-provider
                v-slot="{ errors }"
                name="email"
                rules="required|email"
              >
                <v-text-field
                  v-model="register.email"
                  :error-messages="errors"
                  label="E-mail"
                  required
                ></v-text-field>
              </validation-provider>

              <validation-provider
                v-slot="{ errors }"
                name="ra"
                :rules="{
                  required: true,
                  digits: 11,
                  regex:''
                }"
              >
                <v-text-field
                  v-model="register.ra"
                  :counter="11"
                  :error-messages="errors"
                  label="RA"
                  required
                ></v-text-field>
              </validation-provider>

              <validation-provider
                v-slot="{ errors }"
                name="cpf"
                rules="required|cpf"
              >
                <v-text-field
                  v-model="register.cpf"
                  :error-messages="errors"
                  label="CPF"
                  required
                ></v-text-field>
              </validation-provider>

              <validation-provider
                v-slot="{ errors }"
                name="select"
                rules="required"
              >
                <v-select
                  v-model="select"
                  :items="items"
                  :error-messages="errors"
                  label="Perfil"
                  data-vv-name="select"
                  required
                ></v-select>
              </validation-provider>

              <v-btn
                class="mr-4"
                type="submit"
                :disabled="invalid"
              >
                submit 
              </v-btn>
              <v-btn @click="clear">
                clear
              </v-btn>
            </form>
          </validation-observer>
        
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
  import api from '../services/api';

  setInteractionMode('eager')

  extend('digits', {
    ...digits,
    message: '{_field_} deve ter {length} digitos. ({_value_})',
  })

  extend('required', {
    ...required,
    message: '{_field_} não pode estar vazio',
  })

  extend('max', {
    ...max,
    message: '{_field_} não pode ter mais de {length} caracteres',
  })

  extend('regex', {
    ...regex,
    message: '{_field_} {_value_} não corresponde {regex}',
  })

  extend('email', {
    ...email,
    message: '{_field_} inválido!',
  })

  export default {
    name: 'register',
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
      select: null,
      items: [
        'Estudante',
        'Administrador',
      ],
      checkbox: null,
      register: {
        name: '', 
        email: '', 
        ra: null, 
        cpf: ''
      }
    }),

    created() {},

    methods: {
      submit () {
        this.$refs.observer.validate();
        this.send();
      },

      clear () {
        this.register = {
          name: '', 
          email: '', 
          ra: null, 
          cpf: ''
        }
      },

      async send() {
        try {
          await api.post('students', this.register);
        } catch (err) {
          console.log('🔴 err', err);
        }
      }
    }
  }
</script>
