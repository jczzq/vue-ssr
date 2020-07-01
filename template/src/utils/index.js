import Vue from 'vue';
import NoSSR from '~/assets/js/nossr';

Vue.component(NoSSR.name, NoSSR);
Vue.prototype.$channel = new Vue();

Vue.prototype.$resize = (url, options = {}) => {
  if (!url) {
    return '';
  }

  if (/imageMogr2/.test(url)) {
    return url;
  }

  const link = /^http/.test(url) ? url : `http://${url}`;
  const canUseWebP = () => {
    if (Vue.prototype.$isServer) {
      return false;
    }
    if (window.supportWebP !== undefined) {
      return window.supportWebP;
    }

    const elem = document.createElement('canvas');

    if (elem.getContext && elem.getContext('2d')) {
      const support = elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
      window.supportWebP = support;
      return support;
    }

    return false;
  };

  const format = canUseWebP() ? '/format/webp' : '';
  const mode = options.mode === undefined ? 1 : options.mode;

  if ((mode === 1 && !options.width) || (!options.width && !options.height)) {
    return `${link}?imageMogr2/auto-orient/strip${format}`;
  }

  let width;
  let height;

  if (mode === 1) {
    width = `/w/${options.width}`;
    height = options.height ? `/h/${options.height}` : `/h/${options.width}`;
  } else {
    width = options.width ? `/w/${options.width}` : '';
    height = options.height ? `/h/${options.height}` : '';
  }

  return `${link}?imageMogr2/auto-orient/strip|imageView2/${mode}${width}${height}${format}`;
};
