'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.useMarketplaceCollections = void 0;

var general_constants_1 = require('../../domain/constants/general.constants');

var state_enum_1 = require('../../domain/enums/state.enum');

var useMojitoFactory_1 = require('../useMojitoFactory/useMojitoFactory');

function selectorFn(response) {
  if (!response) return undefined;
  return response.marketplace.collections;
}

function useMarketplaceCollections(_a) {
  var _b = _a === void 0 ? {} : _a,
    options = _b.options;

  return (0, useMojitoFactory_1.useMojitoFactory)({
    as: 'collections',
    query: state_enum_1.EMojitoKey.marketplaceCollectionsInfoWithItemsIdAndSlug,
    variables: {
      id: general_constants_1.config.MARKETPLACE_ID,
    },
    options: options,
    selectorFn: selectorFn,
  });
}

exports.useMarketplaceCollections = useMarketplaceCollections;
exports['default'] = useMarketplaceCollections;
