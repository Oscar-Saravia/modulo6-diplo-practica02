<template>
  <div>
    <h1>{{ mechanic ? 'Editar Mecanico' : 'Registrar Mecanico' }}</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="form.name" :class="{ 'is-invalid': errors.name }"
          placeholder="Ingrese el Nombre" />
        <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
      </div>
      <div class="form-group">
        <label for="specialization">Dirección:</label>
        <textarea id="specialization" v-model="form.specialization" :class="{ 'is-invalid': errors.specialization }"
          placeholder="Ingrese la dirección"></textarea>
        <div v-if="errors.specialization" class="invalid-feedback">{{ errors.specialization }}</div>
      </div>
      <div class="form-group">
        <label for="phone">Teléfono:</label>
        <input type="tel" id="phone" v-model="form.phone" :class="{ 'is-invalid': errors.phone }"
          placeholder="Ingrese el teléfono" />
        <div v-if="errors.phone" class="invalid-feedback">{{ errors.phone }}</div>
      </div>
      <button type="submit" class="btn btn-primary">{{ mechanic ? 'Actualizar' : 'Registrar' }}</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MechanicFormView',
  props: {
    mechanic: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {
        name: '',
        phone: '',
        specialization: ''
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

      if (!this.form.specialization) {
        this.errors.specialization = 'La dirección es obligatoria.';
      }
      
      if (!this.form.phone) {
        this.errors.phone = 'El teléfono es obligatorio.';
      } else if (!/^(\+?\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{1,4}([-.\s]?\d{1,9})+$/.test(this.form.phone)) {
        this.errors.phone = 'El teléfono no es válido.';
      }
      
      return Object.keys(this.errors).length === 0;
    },

    submitForm() {
      if (this.validateForm()) {
        this.save();
      }
    },

    save() {
      const endpoint = this.mechanic ? `${this.baseUrl}/mechanics/${this.mechanic.id}` : `${this.baseUrl}/mechanics`;
      const method = this.mechanic ? 'put' : 'post';

      this.axios[method](endpoint, this.form)
        .then(response => {
          if (response.status === (this.mechanic ? 200 : 201)) {
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
        specialization: ''
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
    mechanic: {
      handler(newMechanic) {
        if (newMechanic) {
          this.form = { ...newMechanic };
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
