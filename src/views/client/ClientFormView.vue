<template>
  <div>
    <h1>{{ client ? 'Editar Cliente' : 'Registrar Cliente' }}</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="form.name" :class="{ 'is-invalid': errors.name }"
          placeholder="Ingrese el Nombre" />
        <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
      </div>
      <div class="form-group">
        <label for="phone">Teléfono:</label>
        <input type="tel" id="phone" v-model="form.phone" :class="{ 'is-invalid': errors.phone }"
          placeholder="Ingrese el teléfono" />
        <div v-if="errors.phone" class="invalid-feedback">{{ errors.phone }}</div>
      </div>

      <div class="form-group">
        <label for="address">Dirección:</label>
        <textarea id="address" v-model="form.address" :class="{ 'is-invalid': errors.address }"
          placeholder="Ingrese la dirección"></textarea>
        <div v-if="errors.address" class="invalid-feedback">{{ errors.address }}</div>
      </div>

      <button type="submit" class="btn btn-primary">{{ client ? 'Actualizar' : 'Registrar' }}</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ClientFormView',
  props: {
    client: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {
        name: '',
        phone: '',
        address: ''
      },
      errors: {}
    };
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (!this.form.name) {
        this.errors.name = 'El nombre es obligatorio.';
      }

      if (!this.form.phone) {
        this.errors.phone = 'El teléfono es obligatorio.';
      } else if (!/^(\+?\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{1,4}([-.\s]?\d{1,9})+$/.test(this.form.phone)) {
        this.errors.phone = 'El teléfono no es válido.';
      }

      if (!this.form.address) {
        this.errors.address = 'La dirección es obligatoria.';
      }

      return Object.keys(this.errors).length === 0;
    },

    submitForm() {
      if (this.validateForm()) {
        this.save();
      }
    },

    save() {
      const endpoint = this.client ? `${this.baseUrl}/clients/${this.client.id}` : `${this.baseUrl}/clients`;
      const method = this.client ? 'put' : 'post';

      this.axios[method](endpoint, this.form)
        .then(response => {
          if (response.status === (this.client ? 200 : 201)) {
            this.$emit('on-register', response.data);
            this.resetForm();
          }
        })
        .catch(error => {
          console.error(error);
        });
    },

    resetForm() {
      this.form = {
        name: '',
        phone: '',
        address: ''
      };
      this.errors = {};
    }
  },
  computed: {
    ...mapGetters(['getBaseUrl']),
    baseUrl() {
      return this.getBaseUrl;
    }
  },
  watch: {
    client: {
      handler(newClient) {
        if (newClient) {
          this.form = { ...newClient };
        } else {
          this.resetForm();
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped></style>
