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
                name="telefone"
                :rules="{
                  required: true,
                  digits: 11,
                  regex:''
                }"
              >
                <v-text-field
                  v-model="register.phone"
                  :counter="11"
                  :error-messages="errors"
                  label="Telefone"
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
                Enviar 
              </v-btn>
              <v-btn @click="clear">
                Limpar
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
    name: 'form-register',
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
      select: 'Estudante',
      items: [
        'Estudante',
        'Administrador',
      ],
      checkbox: null,
      register: {
        name: 'Amaro Silva', 
        email: 'arcamos.j@gmail.com', 
        phone: 12345678912, 
        cpf: '11122233344'
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
          phone: null, 
          cpf: ''
        }
      },

      async send() {
        try {
          const response = await api.post('users', this.register);
          if (response) {
            console.log('🔵 response', response)
          }
        } catch (err) {
          console.log('🔴 err', err);
        }
      }
    }
  }
</script>
