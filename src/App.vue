<template>
  <Menu>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/clients" v-if="canSee(['super-admin', 'admin'])">Clients</router-link>
    <router-link to="/vehicles" v-if="canSee(['super-admin', 'admin', 'user'])">Vehicles</router-link>
    <router-link to="/mechanics" v-if="canSee(['super-admin', 'admin'])">Mechanics</router-link>
    <router-link to="/services" v-if="canSee(['super-admin', 'admin', 'user'])">Services</router-link>
  </Menu>
  <router-view />
</template>

<script>
import {mapGetters } from 'vuex'
import Menu from './components/Menu.vue'

export default {
  name: 'App',
  components: {
    Menu
  },
  methods: {
    canSee(roles) {
      console.log('canSee', this.role);
      return roles.includes(this.role);
    }
  },
  computed: {
    ...mapGetters(['role'])
  }
}
</script>

<style lang="scss"></style>
