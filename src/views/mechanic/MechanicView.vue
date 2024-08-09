<template>
  <div class="mechanic-list">
    <Modal v-model:modelValue="showModalForm">
      <mechanicFormView @on-register="handleRegister" :mechanic="mechanicToEdit" />
    </Modal>
    <h1>Lista de Mecanicos</h1>
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
          <th>Specialization</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(mechanic, index) in filteredMechanics" :key="mechanic.id">
          <td>{{ 1 + index }}</td>
          <td>{{ mechanic.name }}</td>
          <td>{{ mechanic.specialization }}</td>
          <td>{{ mechanic.phone }}</td>
          <td>
            <button @click="edit(mechanic)" class="btn btn-dark">Edit</button>
            <button @click="removeMechanic(mechanic.id)" class="btn btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Modal from '../../components/Modal.vue'
import MechanicFormView from './MechanicFormView.vue'

export default {
  name: 'Mechanic',
  data() {
    return {
      showModalForm: false,
      mechanicToEdit: null,
      textToSearch: '',
    }
  },
  components: {
    Modal,
    MechanicFormView,
  },
  methods: {
    ...mapActions('mechanic', ['fetchMechanics']),
    edit(mechanic) {
      this.mechanicToEdit = { ...mechanic };
      this.showModalForm = true;
    },
    removeMechanic(id) {
      if (confirm("¿Está seguro de eliminar el registro?")) {
        this.axios.delete(`${this.baseUrl}/mechanics/${id}`)
          .then(() => {
            this.fetchMechanics();
            this.$toast.show("Registro eliminado.", "danger");
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    handleRegister() {
      this.fetchMechanics();
      this.showModalForm = false;
      this.$toast.show('Registro exitoso', 'success');
    },
    openRegisterModal() {
      this.mechanicToEdit = null;
      this.showModalForm = true;
    },
  },
  computed: {
    ...mapGetters(['getBaseUrl']),
    ...mapGetters('mechanic', ['mechanicList']),
    baseUrl() {
      return this.getBaseUrl;
    },
    filteredMechanics() {
        console.log(this.mechanicList);
      return this.mechanicList.filter(mechanic => {
        return mechanic.name.toLowerCase().includes(this.textToSearch.toLowerCase());
      });
    }
  },
  mounted() {
    this.fetchMechanics();
  }
}
</script>

<style scoped>
.mechanic-list {
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
