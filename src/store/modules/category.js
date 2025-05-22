import { defineStore } from 'pinia';
import { getCategory } from '@/api/category.js';
import { ALL_CATEGORY_ITEM, CATECORY_NOMAR_DATE } from '@/constants';

const categoryStory = defineStore('category', {
  // 开启持久化
  persist: true,
  state: () => ({
    categorys: CATECORY_NOMAR_DATE,
  }),
  getters: {
    categoryList: (state) => state.categorys,
  },
  actions: {
    async useCategoryData() {
      const { categorys } = await getCategory();
      this.categorys = [ALL_CATEGORY_ITEM, ...categorys];
    },
  },
});

export default categoryStory;
