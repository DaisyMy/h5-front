import { defineStore } from 'pinia';
import { getCategory } from '@/api/category.js';
import { ALL_CATEGORY_ITEM } from '@/constants';

const categoryStory = defineStore('category', {
  state: () => ({
    categorys: [],
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
