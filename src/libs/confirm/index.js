import { h, render } from 'vue'
import confirmComponent from './index.vue'

/**
 *
 * @param {*} title 标题
 * @param {*} content 文本
 * @param {*} cancelText 取消按钮文本
 * @param {*} confirmText 确定按钮文本
 * @returns
 */
export const confirm = (title, content, confirmText = '确定', cancelText = '取消') => {
  return new Promise((resolve, reject) => {
    if (title && !content) {
      content = title;
      title = '';
    }

    const close = () => {
      render(null, document.body);
    };

    const cancelHandler = () => {
      reject(new Error('cancel'));
    };

    const confirmHandler = () => {
      resolve();
    };

    const vnode = h(confirmComponent, {
      title,
      content,
      confirmText,
      cancelText,
      cancelHandler,
      confirmHandler,
      close,
    });

    render(vnode, document.body);
  });
};
