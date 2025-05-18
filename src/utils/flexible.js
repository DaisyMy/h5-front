import { computed } from 'vue';
import { useWindowSize } from '@vueuse/core';
import { PC_DEVICE_WINTH } from '@/constants';

const { width } = useWindowSize();
/**
 * 判断当前设备是否为移动设备
 */
export const isMobileTerminal = computed(() => {
  return width.value < PC_DEVICE_WINTH;
});

/**
 * 根据用户设备设置的rem基准值
 */
export const useREm = () => {
  // 最大的rem基准值
  const MAX_FONT_SIZE = 40;

  // 监听文档解析完成事件
  document.addEventListener('DOMContentLoaded', () => {
    const html = document.querySelector('html');
    // 屏幕宽度/10 为根元素的基准值
    console.log(window.innerWidth);
    let fontSize = window.innerWidth / 10;
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize;
    // 设置根元素的基准值
    html.style.fontSize = fontSize + 'px';
  });
};
