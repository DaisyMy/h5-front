import usethemeStore from '@/store/modules/theme';
import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constants';

let matchMedia;
const watchSystemthemeChange = () => {
  if (matchMedia) return;
  matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
  matchMedia.onchange = function () {
    chengeTheme(THEME_SYSTEM);
  };
};

const chengeTheme = (theme) => {
  let themeClassName = '';
  switch (theme) {
    case THEME_LIGHT:
      themeClassName = 'light';
      break;
    case THEME_DARK:
      themeClassName = 'dark';
      break;
    case THEME_SYSTEM:
      watchSystemthemeChange();
      themeClassName = matchMedia.matches ? 'dark' : 'light';
      break;
    default:
      themeClassName = 'light';
  }
  document.querySelector('html').className = themeClassName;
};

export default () => {
  watch(() => usethemeStore().theme, chengeTheme, {
    immediate: true,
  });
};
