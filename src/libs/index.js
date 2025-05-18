import svgIcon from './svg-icon/index.vue';
import popup from './popup/index.vue'

export default {
  install(app) {
    app.component('svg-icon', svgIcon);
    app.component('daisy-popup', popup);
  },
};
