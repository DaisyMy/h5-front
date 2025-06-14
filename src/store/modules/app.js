import { defineStore } from 'pinia';
import { ALL_CATEGORY_ITEM } from '@/constants';
import { isMobileTerminal } from '@/utils/flexible'

const appStory = defineStore('app', {
  // 开启持久化
  persist: false,
  state: () => ({
    currentCategory: ALL_CATEGORY_ITEM,
    routerType: 'none',
  }),
  getters: {},
  actions: {
    changeCurrentCategory(category) {
      this.currentCategory = category;
    },
    changeRouterType(type) {
      this.routerType = type;
    },
    getRouterType() {
      if(!isMobileTerminal.value){
        return 'none'
      }
      return this.routerType;
    }
  },
});

export default appStory;
