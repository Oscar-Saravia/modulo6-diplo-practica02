<template>
  <div>
    <h1>{{ vehicle ? 'Editar Vehiculo' : 'Registrar Vehiculo' }}</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="client">Client:</label>
        <select id="client" v-model="form.client_id" :class="{'is-invalid': errors.client_id }">
          <option :value="client.id" v-for="(client, index) in clientList" :key="`client-${index}`">{{ client.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="type">Type:</label>
        <select id="type" v-model="form.type" :class="{'is-invalid': errors.type }">
          <option :value="type" v-for="(type, index) in typeList" :key="`type-${index}`">{{ type }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="brand">Marca:</label>
        <input type="text" id="brand" v-model="form.brand" :class="{ 'is-invalid': errors.brand }"
          placeholder="Ingrese la Marca" />
        <div v-if="errors.brand" class="invalid-feedback">{{ errors.brand }}</div>
      </div>
      <div class="form-group">
        <label for="model">Model:</label>
        <input type="text" id="model" v-model="form.model" :class="{ 'is-invalid': errors.model }"
          placeholder="Ingrese el modelo" />
        <div v-if="errors.model" class="invalid-feedback">{{ errors.model }}</div>
      </div>
      <div class="form-group">
        <label for="year">Year:</label>
        <input type="number" id="year" v-model="form.year" :class="{ 'is-invalid': errors.year }"
          placeholder="Ingrese el Anio"/>
        <div v-if="errors.year" class="invalid-feedback">{{ errors.year }}</div>
      </div>

      <button type="submit" class="btn btn-primary">{{ vehicle ? 'Actualizar' : 'Registrar' }}</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'VehicleFormView',
  props: {
    vehicle: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      clientList: [],
      typeList:[
        "Car",
        "Motorcycle"
      ],
      form: {
        client_id: null,
        type: '',
        brand: '',
        model: '',
        year: '',
      },
      errors: {}
    };
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (!this.form.type) {
        this.errors.type = 'El tipo es obligatorio.';
      }

      if (!this.form.brand) {
        this.errors.brand = 'La marca es obligatorio.';
      }

      if (!this.form.model) {
        this.errors.model = 'El modelo es obligatorio.';
      }

      if (!this.form.year) {
        this.errors.year = 'El anio del vehiculo es obligatorio.';
      }

      return Object.keys(this.errors).length === 0;
    },

    submitForm() {
      if (this.validateForm()) {
        this.save();
      }
    },

    save() {
      const endpoint = this.vehicle ? `${this.baseUrl}/vehicles/${this.vehicle.id}` : `${this.baseUrl}/vehicles`;
      const method = this.vehicle ? 'put' : 'post';

      this.axios[method](endpoint, this.form)
        .then(response => {
          if (response.status === (this.vehicle ? 200 : 201)) {
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
        client_id: null,
        type: '',
        brand: '',
        model: '',
        year: '',
      };
      this.errors = {};
    },

    getClientList(){
      const vm = this
      this.axios.get(`${this.baseUrl}/clients`)
       .then(response => {
          vm.clientList = response.data;
        })
       .catch(error => {
          console.error(error);
        });
    }
  },
  computed: {
    ...mapGetters(['getBaseUrl']),
    baseUrl() {
      return this.getBaseUrl;
    }
  },
  watch: {
    vehicle: {
      handler(newVehicle) {
        if (newVehicle) {
          this.form = { ...newVehicle };
        } else {
          this.resetForm();
        }
      },
      immediate: true
    }
  },
  mounted(){
    this.getClientList();
  }
}
</script>

<style scoped></style>
