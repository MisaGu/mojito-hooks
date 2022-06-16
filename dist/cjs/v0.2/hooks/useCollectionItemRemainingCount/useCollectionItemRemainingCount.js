'use strict';

var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
        }

        return t;
      };

    return __assign.apply(this, arguments);
  };

var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};

    for (var p in s) {
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }

    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  };

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.useCollectionItemRemainingCount = void 0;

var state_enum_1 = require('../../domain/enums/state.enum');

var getSlug_util_1 = require('../../domain/utils/getSlug.util');

var useMojitoFactory_1 = require('../useMojitoFactory/useMojitoFactory');

function selectorFn(collectionItemRequest) {
  if (!collectionItemRequest) return undefined;
  return collectionItemRequest.collectionItemById.details.remainingCount;
}

function useCollectionItemRemainingCount(_a) {
  var collectionItemID = _a.collectionItemID,
    options = _a.options,
    props = __rest(_a, ['collectionItemID', 'options']);

  var slug = (0, getSlug_util_1.getCollectionSlug)(props.slug);
  return (0, useMojitoFactory_1.useMojitoFactory)({
    as: 'remainingCount',
    query: state_enum_1.EMojitoKey.collectionItemByIdRemainingCount,
    variables: {
      id: collectionItemID,
      slug: slug,
    },
    options: __assign(__assign({}, options), {
      enabled: !!slug,
    }),
    selectorFn: selectorFn,
    onlyAuthenticated: true,
  });
}

exports.useCollectionItemRemainingCount = useCollectionItemRemainingCount;
exports['default'] = useCollectionItemRemainingCount;
