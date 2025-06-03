import { defineStore } from 'pinia';
import { ALL_CATEGORY_ITEM } from '@/constants';

const appStory = defineStore('app', {
  // 开启持久化
  persist: false,
  state: () => ({
    currentCategory: ALL_CATEGORY_ITEM,
  }),
  getters: {},
  actions: {
    changeCurrentCategory(category) {
      this.currentCategory = category;
    },
  },
});

export default appStory;
