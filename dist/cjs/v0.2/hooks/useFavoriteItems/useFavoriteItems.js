'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.useFavoriteItems = void 0;

var state_enum_1 = require('../../domain/enums/state.enum');

var useMojitoFactory_1 = require('../useMojitoFactory/useMojitoFactory');

function selectorFn(response) {
  if (!response) return undefined;
  return response.me.favoriteItems;
}

function useFavoriteItems(_a) {
  var _b = _a === void 0 ? {} : _a,
    options = _b.options;

  return (0, useMojitoFactory_1.useMojitoFactory)({
    as: 'favoriteItems',
    query: state_enum_1.EMojitoKey.userFavorites,
    options: options,
    selectorFn: selectorFn,
    onlyAuthenticated: true,
  });
}

exports.useFavoriteItems = useFavoriteItems;
exports['default'] = useFavoriteItems;
