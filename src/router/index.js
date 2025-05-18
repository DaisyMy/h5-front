import { createWebHistory, createRouter } from 'vue-router';
import { isMobileTerminal } from '@/utils/flexible';
import moblie_routes from './modules/moblie_routes';
import pc_routes from './modules/pc_routes';

const router = createRouter({
  history: createWebHistory(),
  routes: isMobileTerminal.value ? moblie_routes : pc_routes,
});

export default router;
