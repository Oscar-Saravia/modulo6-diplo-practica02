<template>
  <div>
    <Modal v-model:modelValue="showModalForm">
      <VehicleFormView @on-register="handleRegister" :vehicle="vehicleToEdit" />
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
          placeholder="Buscar por marca o modelo..."
          class="search-input"
        />
        <button class="btn btn-light">Buscar</button>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Cliente</th>
          <th>Tipo</th>
          <th>Marca</th>
          <th>Modelo</th>
          <th>Año</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(vehicle, index) in filteredVehicles" :key="vehicle.id">
          <td>{{ 1 + index }}</td>
          <td>{{ getClientName(vehicle.client_id) }}</td>
          <td>{{ vehicle.type }}</td>
          <td>{{ vehicle.brand }}</td>
          <td>{{ vehicle.model }}</td>
          <td>{{ vehicle.year }}</td>
          <td>
            <button @click="edit(vehicle)" class="btn btn-dark" style="margin-right: 15px;">Editar</button>
            <button @click="removeVehicle(vehicle.id)" class="btn btn-danger">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Modal from '../../components/Modal.vue'
import VehicleFormView from './VehicleFormView.vue'

export default {
  name: 'Vehicle',
  data() {
    return {
      showModalForm: false,
      vehicleToEdit: null,
      textToSearch: '',
      ownerMap: {},
    }
  },
  components: {
    Modal,
    VehicleFormView,
  },
  methods: {
    ...mapActions('vehicle', ['fetchVehicles']),
    ...mapActions('client', ['fetchClients']),
    
    fetchOwners() {
      this.fetchClients()
        .then(clients => {
          clients.forEach(client => {
            this.ownerMap[client.id] = client.name;
          });
        })
        .catch(error => {
          console.error("Error al obtener los clientes:", error);
        });
    },
    edit(vehicle) {
      this.vehicleToEdit = { ...vehicle };
      this.showModalForm = true;
    },
    removeVehicle(id) {
      if (confirm("¿Está seguro de eliminar el registro?")) {
        this.axios.delete(`${this.baseUrl}/vehicles/${id}`)
          .then(() => {
            this.fetchVehicles();
            this.$toast.show("Registro eliminado.", "danger");
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    handleRegister() {
      this.fetchVehicles();
      this.showModalForm = false;
      this.$toast.show('Registro exitoso', 'success');
    },
    openRegisterModal() {
      this.vehicleToEdit = null;
      this.showModalForm = true;
    },
    getClientName(clientId) {
      return this.ownerMap[clientId] || 'Desconocido';
    }
  },
  computed: {
    ...mapGetters(['getBaseUrl']),
    ...mapGetters('vehicle', ['vehicleList']),
    baseUrl() {
      return this.getBaseUrl;
    },
    filteredVehicles() {
      return this.vehicleList.filter(vehicle => {
        return vehicle.brand.toLowerCase().includes(this.textToSearch.toLowerCase()) || 
              vehicle.model.toLowerCase().includes(this.textToSearch.toLowerCase())
      });
    }
  },
  mounted() {
    this.fetchVehicles();
    this.fetchOwners(); 
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
