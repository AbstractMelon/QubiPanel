import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import AppPage from '../views/AppPage.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/app/:id', component: AppPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
