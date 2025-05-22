import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import useThemeStore from './modules/theme';
import useCategoryStore from './modules/category';

const store = createPinia();
store.use(piniaPluginPersistedstate)

export default store;
