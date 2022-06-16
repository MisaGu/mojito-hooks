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

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.useCollectionItemById = void 0;

var state_enum_1 = require('../../domain/enums/state.enum');

var marketplaceCollectionsInfoWithItemsIdAndSlug_util_1 = require('../../domain/utils/state/marketplaceCollectionsInfoWithItemsIdAndSlug.util');

var useMojitoFactory_1 = require('../useMojitoFactory/useMojitoFactory');

function selectorFn(response) {
  if (!response) return undefined;
  return response.collectionItemById;
}

function useCollectionItemById(_a) {
  var id = _a.id,
    options = _a.options;

  var _id = (0, marketplaceCollectionsInfoWithItemsIdAndSlug_util_1.checkCollectionItemId)(id);

  return (0, useMojitoFactory_1.useMojitoFactory)({
    as: 'item',
    query: state_enum_1.EMojitoKey.collectionItemById,
    variables: {
      id: _id,
    },
    options: __assign(__assign({}, options), {
      enabled: !!_id,
    }),
    selectorFn: selectorFn,
  });
}

exports.useCollectionItemById = useCollectionItemById;
exports['default'] = useCollectionItemById;
