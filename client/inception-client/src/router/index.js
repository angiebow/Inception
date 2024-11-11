// client/src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import ViewPapers from '@/views/ViewPapers.vue';
import SubmitPapers from '@/views/SubmitPapers.vue';
import FavoritePapers from '@/views/FavoritePapers.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Dashboard from '@/views/Dashboard.vue';

const routes = [
  { path: '/', component: Dashboard },
  { path: '/view-paper', component: ViewPapers },
  { path: '/submit-paper', component: SubmitPapers },
  { path: '/favorites', component: FavoritePapers },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/home', component: HomePage },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;