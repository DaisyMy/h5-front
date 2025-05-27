import { useIntersectionObserver } from '@vueuse/core';

// 懒加载指令
export default {
  mounted(el) {
    const imgSrc = el.src;
    el.src = '';
    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        el.src = imgSrc;
        stop();
      }
    });
  },
};
