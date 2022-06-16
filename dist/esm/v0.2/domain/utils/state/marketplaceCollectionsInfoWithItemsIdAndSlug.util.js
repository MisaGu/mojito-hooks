import { config } from '../../constants/general.constants';
import { EMojitoKey } from '../../enums/state.enum';
import { queryClient } from '../gqlRequest.util';
import { QueryKey } from '../queryKeyFactory.util';
var marketplaceCollectionsSlugQueryKey = QueryKey.get(
  EMojitoKey.marketplaceCollectionsInfoWithItemsIdAndSlug,
  {
    id: config.MARKETPLACE_ID,
  },
);
export function checkCollectionSlug(slug) {
  var _a;

  if (!slug) return undefined;

  var _data = queryClient.getQueryData(marketplaceCollectionsSlugQueryKey);

  return (_a =
    _data === null || _data === void 0
      ? void 0
      : _data.find(function (collection) {
          return collection.slug == slug;
        })) === null || _a === void 0
    ? void 0
    : _a.slug;
}
export function checkCollectionId(id) {
  var _a;

  if (!id) return undefined;

  var _data = queryClient.getQueryData(marketplaceCollectionsSlugQueryKey);

  return (_a =
    _data === null || _data === void 0
      ? void 0
      : _data.find(function (collection) {
          return collection.id == id;
        })) === null || _a === void 0
    ? void 0
    : _a.id;
}
export function checkCollectionItemSlug(slug) {
  var _a, _b;

  if (!slug) return undefined;

  var _data = queryClient.getQueryData(marketplaceCollectionsSlugQueryKey);

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
export function checkCollectionItemId(id) {
  var _a, _b;

  if (!id) return undefined;

  var _data = queryClient.getQueryData(marketplaceCollectionsSlugQueryKey);

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
