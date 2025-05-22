import { defineStore } from 'pinia';
import { THEME_LIGHT } from '@/constants';

const themeStore = defineStore('theme', {
  // 开启持久化
  persist: true,
  state: () => ({
    themeType: THEME_LIGHT,
  }),
  getters: {
    theme: (state) => state.themeType,
  },
  actions: {
    changeThemeType(type) {
      this.themeType = type;
    },
  },
});

export default themeStore;
