import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue'; // Confirm this path
import ViewPapers from '@/views/ViewPapers.vue'; // Confirm this path
import SubmitPapers from '@/views/SubmitPapers.vue'; // Confirm this path
import Login from '@/views/Login.vue'; // Confirm this path
import Register from '@/views/Register.vue'; // Confirm this path
import Dashboard from '@/views/Dashboard.vue';

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/view-paper',
    component: ViewPapers,
  },
  {
    path: '/submit-paper',
    component: SubmitPapers,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/dashboard',
    component: Dashboard,
  }
  // other routes
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;