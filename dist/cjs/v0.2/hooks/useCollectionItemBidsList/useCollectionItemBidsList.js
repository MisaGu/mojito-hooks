'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.useCollectionItemBidsList = void 0;

var state_enum_1 = require('../../domain/enums/state.enum');

var useMojitoFactory_1 = require('../useMojitoFactory/useMojitoFactory');

function selectorFn(response) {
  if (!response) return undefined;
  return response.collectionItemById.details.bids;
}

function useCollectionItemBidsList(_a) {
  var collectionItemID = _a.collectionItemID,
    options = _a.options;
  return (0, useMojitoFactory_1.useMojitoFactory)({
    as: 'bids',
    query: state_enum_1.EMojitoKey.collectionItemByIdBidsList,
    variables: {
      id: collectionItemID,
    },
    options: options,
    selectorFn: selectorFn,
  });
}

exports.useCollectionItemBidsList = useCollectionItemBidsList;
exports['default'] = useCollectionItemBidsList;
