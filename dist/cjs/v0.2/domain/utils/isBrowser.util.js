'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.isBrowser = void 0;
exports.isBrowser = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);
