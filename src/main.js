import { createApp } from 'vue';
import store from '@/store';
import router from '@/router';
import 'virtual:svg-icons-register';

import App from '@/App.vue';

import '@/styles/index.css';

import mLibs from './libs';
import mDirective from './directives';
import { useREm } from '@/utils/flexible.js';
import useTheme from '@/utils/theme.js';
import './permission'

const app = createApp(App);

app.use(router).use(store).use(mLibs).use(mDirective);

app.mount('#app');

useREm();
useTheme();
