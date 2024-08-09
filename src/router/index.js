import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/clients',
    name: 'client',
    component: () => import('../views/client/ClientView.vue'),
    meta: { requiresAuth: true, roles: ['super-admin', 'admin'] } 
  },
  {
    path: '/vehicles',
    name: 'vehicle',
    component: () => import('../views/vehicle/VehicleView.vue'),
    meta: { requiresAuth: true, roles: ['super-admin', 'admin', 'user'] } 
  },
  {
    path: '/mechanics',
    name: 'mechanic',
    component: () => import('../views/mechanic/MechanicView.vue'),
    meta: { requiresAuth: true, roles: ['super-admin', 'admin'] } 
  },
  {
    path: '/services',
    name: 'service',
    component: () => import('../views/service/ServiceView.vue'),
    meta: { requiresAuth: true, roles: ['super-admin', 'admin', 'user'] } 
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const userRole = store.getters.role; 
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (userRole && to.meta.roles.includes(userRole)) {
      next(); 
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router
