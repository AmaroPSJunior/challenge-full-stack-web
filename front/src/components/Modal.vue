<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog :transition="modalType" max-width="600" v-model="modal" persistent>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar :color="modalToolbarColor" dark>
              {{ modalToolbarText }}</v-toolbar>
            <v-card-text>
              <div class="text-h3 px-12 pt-15">{{ modalMessage }}</div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="justify-end">
              <v-btn text @click="dialog.value = modalClose()">Fechar</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "modal",
  components: {},

  props: ["modalData"],

  data: () => ({}),

  computed: {
    modal() {
      return this.modalData;
    },
    modalType() {
      const type = this.modalData && this.modalData.error ? "bottom" : "top";
      return `dialog-${type}-transition`;
    },
    modalToolbarColor() { 
      return this.modalData && this.modalData.error 
      ? "red" 
      : "green" 
      },
    modalToolbarText() {
      return this.modalData && this.modalData.error ? 'Erro!' : 'Sucesso!';
    },
    modalMessage() {
      return this.modalData && this.modalData.message ? this.modalData.message : '';
    },
  },

  created() {},

  methods: {
    modalClose() {
      const method = this.modalData && this.modalData.error ? 'setModalError' : 'setModalSuccess';
      this.$emit('onModalClose', method);
      return false;
    },
  },
};
</script>
