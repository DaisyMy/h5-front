import { createApp } from 'vue';
import store from '@/store';
import router from '@/router';
import 'virtual:svg-icons-register'

import App from '@/App.vue';

import '@/styles/index.css';

import mLibs from './libs';
import { useREm } from '@/utils/flexible.js';

const app = createApp(App);

app.use(mLibs).use(store).use(router);

app.mount('#app');

useREm();
