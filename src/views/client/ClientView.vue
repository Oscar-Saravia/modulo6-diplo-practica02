<template>
  <div class="client-list">
    <Modal v-model:modelValue="showModalForm">
      <ClientFormView @on-register="handleRegister" :client="clientToEdit" />
    </Modal>
    <h1>Lista de Clientes</h1>
    <div class="actions">
      <button @click="openRegisterModal" class="btn btn-primary">Register</button>
      <div class="search-bar">
        <label for="search">Buscar</label>
        <input
          type="search"
          id="search"
          v-model="textToSearch"
          @input="buscar"
          placeholder="Buscar por nombre..."
        />
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(client, index) in filteredClients" :key="client.id">
          <td>{{ 1 + index }}</td>
          <td>{{ client.name }}</td>
          <td>{{ client.phone }}</td>
          <td>{{ client.address }}</td>
          <td>
            <button @click="edit(client)" class="btn btn-dark">Edit</button>
            <button @click="removeClient(client.id)" class="btn btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Modal from '../../components/Modal.vue'
import ClientFormView from './ClientFormView.vue'

export default {
  name: 'Client',
  data() {
    return {
      showModalForm: false,
      clientToEdit: null,
      textToSearch: '',
    }
  },
  components: {
    Modal,
    ClientFormView,
  },
  methods: {
    ...mapActions('client', ['fetchClients']),
    edit(client) {
      this.clientToEdit = { ...client };
      this.showModalForm = true;
    },
    removeClient(id) {
      if (confirm("¿Está seguro de eliminar el registro?")) {
        this.axios.delete(`${this.baseUrl}/clients/${id}`)
          .then(() => {
            this.fetchClients();
            this.$toast.show("Registro eliminado.", "danger");
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    handleRegister() {
      this.fetchClients();
      this.showModalForm = false;
      this.$toast.show('Registro exitoso', 'success');
    },
    openRegisterModal() {
      this.clientToEdit = null;
      this.showModalForm = true;
    },
  },
  computed: {
    ...mapGetters(['getBaseUrl']),
    ...mapGetters('client', ['clientList']),
    baseUrl() {
      return this.getBaseUrl;
    },
    filteredClients() {
      return this.clientList.filter(client => {
        return client.name.toLowerCase().includes(this.textToSearch.toLowerCase());
      });
    }
  },
  mounted() {
    this.fetchClients();
  }
}
</script>

<style scoped>
.client-list {
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  color: #42b983;
  margin-bottom: 20px;
}

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

.search-bar label {
  margin-right: 10px;
}

.search-bar input {
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
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
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out, border-color 0.15s ease-in-out;
}

.btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: darken(#007bff, 7%);
  border-color: darken(#007bff, 10%);
}

.btn-danger {
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-danger:hover {
  background-color: darken(#dc3545, 7%);
  border-color: darken(#dc3545, 10%);
}

.btn-dark {
  color: #fff;
  background-color: #343a40;
  border-color: #343a40;
}

.btn-dark:hover {
  background-color: darken(#343a40, 7%);
  border-color: darken(#343a40, 10%);
}
</style>
