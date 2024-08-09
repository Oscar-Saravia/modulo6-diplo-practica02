<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          v-model="email"
          id="email"
          :class="{ 'is-invalid': errors.email }"
          required
        />
        <div v-if="errors.email" class="invalid-feedback">{{ errors.email }}</div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <div class="password-wrapper">
          <input
            :type="passwordFieldType"
            v-model="password"
            id="password"
            :class="{ 'is-invalid': errors.password }"
            required
          />
          <button type="button" @click="togglePasswordVisibility">
            {{ showPassword ? 'Hide' : 'Show' }}
          </button>
        </div>
        <div v-if="errors.password" class="invalid-feedback">{{ errors.password }}</div>
      </div>
      <button type="submit" :disabled="loading">
        {{ loading ? 'Cargando...' : 'Login' }}
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      loading: false,
      errors: {}
    }
  },
  computed: {
    ...mapGetters(['getBaseUrl', 'loged', 'user']),
    passwordFieldType() {
      return this.showPassword ? 'text' : 'password'
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
    validateForm() {
      this.errors = {}

      if (!this.email) {
        this.errors.email = 'El correo electrónico es obligatorio.'
      } else if (!/\S+@\S+\.\S+/.test(this.email)) {
        this.errors.email = 'El correo electrónico no es válido.'
      }

      if (!this.password) {
        this.errors.password = 'La contraseña es obligatoria.'
      }
      return Object.keys(this.errors).length === 0
    },
    async handleLogin() {
      if (!this.validateForm()) return

      this.loading = true
      try {
        const response = await this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        })

        if (response) {
          const userRole = this.$store.getters.role
          this.$toast.show('Login exitoso', 'success')
              this.$router.push('/')

        } else {
          this.$toast.show('Email o password incorrectos', 'danger')
        }
      } catch (error) {
        this.$toast.show('Ocurrió un error, inténtelo de nuevo', 'danger')
        console.error(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  margin-top: 100px;
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.password-wrapper {
  display: flex;
  align-items: center;
}

.password-wrapper input {
  flex: 1;
}

.password-wrapper button {
  margin-left: 10px;
}

.is-invalid {
  border-color: red;
}

.invalid-feedback {
  color: red;
  font-size: 12px;
}

button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
