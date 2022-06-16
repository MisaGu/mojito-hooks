import {
  checkCollectionItemSlug,
  checkCollectionSlug,
} from './state/marketplaceCollectionsInfoWithItemsIdAndSlug.util';
import {
  getCollectionItemSlugFromPathname,
  getCollectionSlugFromPathname,
} from './state/path.util';
export function getCollectionSlug(slug) {
  return checkCollectionSlug(
    slug !== null && slug !== void 0 ? slug : getCollectionSlugFromPathname(),
  );
}
export function getCollectionItemSlug(slug) {
  return checkCollectionItemSlug(
    slug !== null && slug !== void 0 ? slug : getCollectionItemSlugFromPathname(),
  );
}
