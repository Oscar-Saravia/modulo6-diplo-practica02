<template>
  <div>
    <Modal v-model:modelValue="showModalForm">
      <ServiceFormView @on-register="handleRegister" :service="serviceToEdit" />
    </Modal>
    <h1>Lista de Vehículos</h1>
    <div class="actions">
      <button @click="openRegisterModal" class="btn btn-primary">Registrar</button>
      <div class="search-bar">
        <label for="search">Buscar:</label>
        <input
          type="search"
          v-model="textToSearch"
          @input="buscar"
          placeholder="Buscar por descripcion"
          class="search-input"
        />
        <button class="btn btn-light">Buscar</button>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Vehicle</th>
          <th>Mechanic</th>
          <th>Description</th>
          <th>Cost</th>
          <th>Registration Date</th>
          <th>Delivery Date</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(service, index) in filteredServices" :key="service.id">
          <td>{{ 1 + index }}</td>
          <td>{{ getVehicleBrand(service.vehicle_id) }}</td>
          <td>{{ getMechanicName(service.mechanic_id) }}</td>
          <td>{{ service.description }}</td>
          <td>{{ service.cost }}</td>
          <td>{{ service.registration_date }}</td>
          <td>{{ service.delivery_date }}</td>
          <td>
            <button @click="edit(service)" class="btn btn-dark" style="margin-right: 15px;">Editar</button>
            <button @click="removeService(service.id)" class="btn btn-danger">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Modal from '../../components/Modal.vue'
import ServiceFormView from './ServiceForm.vue'

export default {
  name: 'Service',
  data() {
    return {
      showModalForm: false,
      serviceToEdit: null,
      textToSearch: '',
    }
  },
  components: {
    Modal,
    ServiceFormView,
  },
  methods: {
    ...mapActions('service', ['fetchServices']),
    ...mapActions('vehicle', ['fetchVehicles']),
    ...mapActions('mechanic', ['fetchMechanics']),

    edit(service) {
      this.serviceToEdit = { ...service };
      this.showModalForm = true;
    },
    removeService(id) {
      if (confirm("¿Está seguro de eliminar el registro?")) {
        this.axios.delete(`${this.baseUrl}/services/${id}`)
          .then(() => {
            this.fetchServices();
            this.$toast.show("Registro eliminado.", "danger");
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    handleRegister() {
      this.fetchServices();
      this.showModalForm = false;
      this.$toast.show('Registro exitoso', 'success');
    },
    openRegisterModal() {
      this.serviceToEdit = null;
      this.showModalForm = true;
    },
    getVehicleBrand(vehicleId) {
      const vehicle = this.vehicleList.find(vehicle => vehicle.id == vehicleId);
      return vehicle ? `${vehicle.brand} - ${vehicle.model}` : 'Desconocido';
    },
    getMechanicName(mechanicId) {
      const mechanic = this.mechanicList.find(mechanic => mechanic.id == mechanicId);
      return mechanic ? mechanic.name : 'Desconocido';
    },
  },
  computed: {
    ...mapGetters(['getBaseUrl']),
    ...mapGetters('service', ['serviceList']),
    ...mapGetters('vehicle', ['vehicleList']),
    ...mapGetters('mechanic', ['mechanicList']),

    baseUrl() {
      return this.getBaseUrl;
    },
    filteredServices() {
      return this.serviceList.filter(service => {
        return service.description.toLowerCase().includes(this.textToSearch.toLowerCase())
      });
    }
  },
  mounted() {
    this.fetchServices();
    this.fetchVehicles();  
    this.fetchMechanics(); 
  }
}
</script>

<style scoped>
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-bar {
  display: flex;
  align-items: center;
}

.search-input {
  margin-left: 10px;
  margin-right: 10px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #42b983;
  color: white;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #ddd;
}

.btn {
  display: inline-block;
  padding: 8px 12px;
  margin: 5px;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
}

.btn-primary {
  background-color: #42b983;
  color: white;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-dark {
  background-color: #343a40;
  color: white;
}

.btn-light {
  background-color: #f8f9fa;
  color: black;
  border: 1px solid #ccc;
}
</style>
