import { defineStore } from 'pinia';
import md5 from 'md5';
import { loginUser, getProfile } from '@/api/sys';
import message from '@/libs';

const userStore = defineStore('user', {
  // 开启持久化
  persist: true,
  state: () => ({
    userInfo: {},
    token: '',
  }),
  actions: {
    async login(params) {
      const { password } = params;
      const data = await loginUser({
        ...params,
        password: password ? md5(password) : '',
      });
      this.token = data.token;
    },
    async profile() {
      const data = await getProfile();
      this.userInfo = data;
      const text = `欢迎您 ${data.vipLevel ? '尊贵的 vip' + data.vipLevel + '用户' + data.nickname : data.nickname}`;
      message('success', text, 6000);
    },
  },
});

export default userStore;
