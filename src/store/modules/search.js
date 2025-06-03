import { defineStore } from 'pinia';

const searchStore = defineStore('search', {
  // 开启持久化
  persist: true,
  state: () => ({
    historys: [],
    searchText: '',
  }),
  actions: {
    addHistory(keyword) {
      const index = this.historys.indexOf(keyword);
      if (index > -1) {
        this.historys.splice(index, 1);
      }
      this.historys.unshift(keyword);
    },
    deleteHistory(index) {
      this.historys.splice(index, 1);
    },
    deleteAllHistory() {
      this.historys = [];
    },
    changeSearchText(text) {
      this.searchText = text;
    },
  },
});

export default searchStore;
