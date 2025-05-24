import { createApp } from 'vue';
import store from '@/store';
import router from '@/router';
import 'virtual:svg-icons-register'

import App from '@/App.vue';

import '@/styles/index.css';

import mLibs from './libs';
import { useREm } from '@/utils/flexible.js';
import useTheme from '@/utils/theme.js';

const app = createApp(App);

app.use(store).use(router).use(mLibs);

app.mount('#app');

useREm();
useTheme();
