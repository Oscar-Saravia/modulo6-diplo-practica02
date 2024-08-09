<template>
  <div>
    <h1>{{ service ? 'Editar Servicio' : 'Registrar Servicio' }}</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="vehicle_id">Vehículo:</label>
        <select id="vehicle_id" v-model="form.vehicle_id" :class="{ 'is-invalid': errors.vehicle_id }">
          <option v-for="vehicle in vehicleList" :key="vehicle.id" :value="vehicle.id">
            {{ vehicle.brand }} - {{ vehicle.model }}
          </option>
        </select>
        <div v-if="errors.vehicle_id" class="invalid-feedback">{{ errors.vehicle_id }}</div>
      </div>

      <div class="form-group">
        <label for="mechanic_id">Mecánico:</label>
        <select id="mechanic_id" v-model="form.mechanic_id" :class="{ 'is-invalid': errors.mechanic_id }">
          <option v-for="mechanic in mechanicList" :key="mechanic.id" :value="mechanic.id">
            {{ mechanic.name }}
          </option>
        </select>
        <div v-if="errors.mechanic_id" class="invalid-feedback">{{ errors.mechanic_id }}</div>
      </div>

      <div class="form-group">
        <label for="description">Descripción:</label>
        <textarea id="description" v-model="form.description" :class="{ 'is-invalid': errors.description }"
          placeholder="Ingrese la descripción"></textarea>
        <div v-if="errors.description" class="invalid-feedback">{{ errors.description }}</div>
      </div>

      <div class="form-group">
        <label for="cost">Costo:</label>
        <input type="number" id="cost" v-model="form.cost" :class="{ 'is-invalid': errors.cost }"
          placeholder="Ingrese el costo" />
        <div v-if="errors.cost" class="invalid-feedback">{{ errors.cost }}</div>
      </div>

      <div class="form-group">
        <label for="registration_date">Fecha de Registro:</label>
        <input type="date" id="registration_date" v-model="form.registration_date" :class="{ 'is-invalid': errors.registration_date }"/>
        <div v-if="errors.registration_date" class="invalid-feedback">{{ errors.registration_date }}</div>
      </div>

      <div class="form-group">
        <label for="delivery_date">Fecha de Entrega:</label>
        <input type="date" id="delivery_date" v-model="form.delivery_date" :class="{ 'is-invalid': errors.delivery_date }"/>
        <div v-if="errors.delivery_date" class="invalid-feedback">{{ errors.delivery_date }}</div>
      </div>

      <button type="submit" class="btn btn-primary">{{ service ? 'Actualizar' : 'Registrar' }}</button>
    </form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ServiceFormView',
  props: {
    service: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {
        vehicle_id: '',
        mechanic_id: '',
        description: '',
        cost: '',
        registration_date: '',
        delivery_date: ''
      },
      errors: {}
    };
  },
  methods: {
    ...mapActions('vehicle', ['fetchVehicles']),
    ...mapActions('mechanic', ['fetchMechanics']),

    validateForm() {
      this.errors = {};

      if (!this.form.vehicle_id) {
        this.errors.vehicle_id = 'El vehículo es obligatorio.';
      }

      if (!this.form.mechanic_id) {
        this.errors.mechanic_id = 'El mecánico es obligatorio.';
      }

      if (!this.form.description) {
        this.errors.description = 'La descripción es obligatoria.';
      }

      if (!this.form.cost) {
        this.errors.cost = 'El costo es obligatorio.';
      }

      if (!this.form.registration_date) {
        this.errors.registration_date = 'La fecha de registro es obligatoria.';
      }

      if (!this.form.delivery_date) {
        this.errors.delivery_date = 'La fecha de entrega es obligatoria.';
      }

      return Object.keys(this.errors).length === 0;
    },

    submitForm() {
      if (this.validateForm()) {
        this.save();
      }
    },

    save() {
      const endpoint = this.service ? `${this.baseUrl}/services/${this.service.id}` : `${this.baseUrl}/services`;
      const method = this.service ? 'put' : 'post';

      this.axios[method](endpoint, this.form)
        .then(response => {
          if (response.status === (this.service ? 200 : 201)) {
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
        vehicle_id: '',
        mechanic_id: '',
        description: '',
        cost: '',
        registration_date: '',
        delivery_date: ''
      };
      this.errors = {};
    }
  },
  computed: {
    ...mapGetters(['getBaseUrl']),
    ...mapGetters('vehicle', ['vehicleList']),
    ...mapGetters('mechanic', ['mechanicList']),
    baseUrl() {
      return this.getBaseUrl;
    }
  },
  watch: {
    service: {
      handler(newService) {
        if (newService) {
          this.form = { ...newService };
        } else {
          this.resetForm();
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.fetchVehicles();
    this.fetchMechanics();
  }
}
</script>
