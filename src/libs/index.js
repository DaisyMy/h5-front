import { defineAsyncComponent } from 'vue';
export { confirm } from './confirm';
export { message } from './message';

export default {
  install(app) {
    // 组件自动注册
    const components = import.meta.glob('./*/index.vue');
    for (const [k, v] of Object.entries(components)) {
      const compName = 'daisy-' + k.replace('./', '').split('/')[0];
      app.component(compName, defineAsyncComponent(v));
    }
  },
};
