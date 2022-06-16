'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.checkCollectionItemId =
  exports.checkCollectionItemSlug =
  exports.checkCollectionId =
  exports.checkCollectionSlug =
    void 0;

var general_constants_1 = require('../../constants/general.constants');

var state_enum_1 = require('../../enums/state.enum');

var gqlRequest_util_1 = require('../gqlRequest.util');

var queryKeyFactory_util_1 = require('../queryKeyFactory.util');

var marketplaceCollectionsSlugQueryKey = queryKeyFactory_util_1.QueryKey.get(
  state_enum_1.EMojitoKey.marketplaceCollectionsInfoWithItemsIdAndSlug,
  {
    id: general_constants_1.config.MARKETPLACE_ID,
  },
);

function checkCollectionSlug(slug) {
  var _a;

  if (!slug) return undefined;

  var _data = gqlRequest_util_1.queryClient.getQueryData(marketplaceCollectionsSlugQueryKey);

  return (_a =
    _data === null || _data === void 0
      ? void 0
      : _data.find(function (collection) {
          return collection.slug == slug;
        })) === null || _a === void 0
    ? void 0
    : _a.slug;
}

exports.checkCollectionSlug = checkCollectionSlug;

function checkCollectionId(id) {
  var _a;

  if (!id) return undefined;

  var _data = gqlRequest_util_1.queryClient.getQueryData(marketplaceCollectionsSlugQueryKey);

  return (_a =
    _data === null || _data === void 0
      ? void 0
      : _data.find(function (collection) {
          return collection.id == id;
        })) === null || _a === void 0
    ? void 0
    : _a.id;
}

exports.checkCollectionId = checkCollectionId;

function checkCollectionItemSlug(slug) {
  var _a, _b;

  if (!slug) return undefined;

  var _data = gqlRequest_util_1.queryClient.getQueryData(marketplaceCollectionsSlugQueryKey);

  return (_b =
    (_a =
      _data === null || _data === void 0
        ? void 0
        : _data.reduce(function (acc, collection) {
            return acc.concat(collection.items);
          }, [])) === null || _a === void 0
      ? void 0
      : _a.find(function (item) {
          return item.slug == slug;
        })) === null || _b === void 0
    ? void 0
    : _b.slug;
}

exports.checkCollectionItemSlug = checkCollectionItemSlug;

function checkCollectionItemId(id) {
  var _a, _b;

  if (!id) return undefined;

  var _data = gqlRequest_util_1.queryClient.getQueryData(marketplaceCollectionsSlugQueryKey);

  return (_b =
    (_a =
      _data === null || _data === void 0
        ? void 0
        : _data.reduce(function (acc, collection) {
            return acc.concat(collection.items);
          }, [])) === null || _a === void 0
      ? void 0
      : _a.find(function (item) {
          return item.id == id;
        })) === null || _b === void 0
    ? void 0
    : _b.id;
}

exports.checkCollectionItemId = checkCollectionItemId;
