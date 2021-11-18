<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog :transition="modalType" max-width="600">
        <template :v-slot:activator="true">
          <v-card>
            <v-toolbar color="primary" dark>
              Opening from the top
            </v-toolbar>
            <v-card-text>
              <div class="text-h2 pa-12">Hello world!</div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="dialog.value = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>

  export default {
    name: 'modal',
    components: {},

    props: ['modalError'],
    
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

    computed: {
      modalType () {
        const type = this.modalError ? 'bottom' :'top';
        return `dialog-${type}-transition`
      }
    },

    created() {},

    methods: {
     
    }
  }
</script>
