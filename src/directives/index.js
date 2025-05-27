// 自动注册指令
export default {
  async install(app) {
    const directives = import.meta.glob('./modules/*.js');
    for (const [k, v] of Object.entries(directives)) {
      const d = await v();
      const arr = k.split('/');
      const name = arr[arr.length - 1].replace(/\.js/g, '');
      app.directive(name, d.default);
    }
  },
};
