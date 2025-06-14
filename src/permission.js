import router from '@/router'
import userUserStore from '@/store/modules/user';
import { message } from '@/libs';

router.beforeEach((to, from) => {
  if (!to.meta.user) {
    return;
  }
  if (userUserStore().token) {
    return true;
  }
  message('warn', '登录已过期，请重新登录')
  return '/';
});
