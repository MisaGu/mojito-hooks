'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.getCollectionItemSlug = exports.getCollectionSlug = void 0;

var marketplaceCollectionsInfoWithItemsIdAndSlug_util_1 = require('./state/marketplaceCollectionsInfoWithItemsIdAndSlug.util');

var path_util_1 = require('./state/path.util');

function getCollectionSlug(slug) {
  return (0, marketplaceCollectionsInfoWithItemsIdAndSlug_util_1.checkCollectionSlug)(
    slug !== null && slug !== void 0 ? slug : (0, path_util_1.getCollectionSlugFromPathname)(),
  );
}

exports.getCollectionSlug = getCollectionSlug;

function getCollectionItemSlug(slug) {
  return (0, marketplaceCollectionsInfoWithItemsIdAndSlug_util_1.checkCollectionItemSlug)(
    slug !== null && slug !== void 0 ? slug : (0, path_util_1.getCollectionItemSlugFromPathname)(),
  );
}

exports.getCollectionItemSlug = getCollectionItemSlug;
