import isBrowser from './isBrowser.util';

export const getPath = isBrowser
  ? window.location.pathname.split('#')[0].split('?')[0].split('/')
  : [];
