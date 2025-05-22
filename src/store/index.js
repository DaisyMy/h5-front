import { createPinia } from 'pinia';
import category from './modules/category';
import getters from './getters';

const store = createPinia({
  getters,
  modules: {
    category,
  },
});

export default store;
