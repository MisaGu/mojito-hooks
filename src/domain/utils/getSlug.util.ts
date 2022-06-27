import {
  checkCollectionItemSlug,
  checkCollectionSlug,
} from './state/marketplaceCollectionsInfoWithItemsIdAndSlug.util';
import {
  getCollectionItemSlugFromPathname,
  getCollectionSlugFromPathname,
} from './state/path.util';

export function getCollectionSlug(slug?: string) {
  return checkCollectionSlug(slug || getCollectionSlugFromPathname());
}

export function getCollectionItemSlug(slug?: string) {
  return checkCollectionItemSlug(slug || getCollectionItemSlugFromPathname());
}
