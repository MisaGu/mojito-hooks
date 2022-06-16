'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.getCollectionItemSlugFromPathname = exports.getCollectionSlugFromPathname = void 0;

var isBrowser_util_1 = require('../isBrowser.util'); // TODO: the path should be taken from the react-query state that is updated by the MHP onRouterChange function

function getPath() {
  var pathnameParam = undefined; // THIS SHOULD BE A VALUE FROM THE STATE

  var pathname = pathnameParam || (isBrowser_util_1.isBrowser && location ? location.pathname : '');
  return pathname.split('/').filter(Boolean);
}

function getCollectionSlugFromPathname() {
  return getPath()[0];
}

exports.getCollectionSlugFromPathname = getCollectionSlugFromPathname;

function getCollectionItemSlugFromPathname() {
  return getPath()[2];
}

exports.getCollectionItemSlugFromPathname = getCollectionItemSlugFromPathname;
