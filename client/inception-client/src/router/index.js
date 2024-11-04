import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue'; // Confirm this path
import ViewPapers from '@/views/ViewPapers.vue'; // Confirm this path
import SubmitPapers from '@/views/SubmitPapers.vue'; // Confirm this path

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
  // other routes
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;