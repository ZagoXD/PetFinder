import { createRouter, createWebHistory } from 'vue-router';
import AdminPage from '@/pages/admin/index.vue';
import axios from 'axios';

const routes = [
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPage,
    meta: { requiresAuth: true, requiresSuperuser: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth || to.meta.requiresSuperuser) {
    try {
      const response = await axios.get('http://localhost:8000/api/check-superuser/', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      if (to.meta.requiresSuperuser && !response.data.is_superuser) {
        return next('/');
      }

      return next();
    } catch (error) {
      console.error('Erro ao verificar superusuário:', error);
      return next('/');
    }
  }

  next();
});

export default router;
