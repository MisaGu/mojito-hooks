import { EOptionKey } from '../../../domain/enums/state.enum';
import { queryClient } from '../gqlRequest.util';
import { isBrowser } from '../isBrowser.util';
import { QueryKey } from '../queryKeyFactory.util';
import UrlPattern from 'url-pattern';

// TODO: the path should be taken from the react-query state that is updated by the MHP onRouterChange function
const urlPatternsQueryKey = QueryKey.get(EOptionKey.urlPatterns);

function getPath(): { collectionSlug?: string; collectionItemSlug?: string } {
  const _urlPatterns = queryClient.getQueryData<UrlPattern[]>(urlPatternsQueryKey);
  const pathname = isBrowser ? location.pathname : '';

  return (
    _urlPatterns
      ?.map((pattern) => pattern.match(pathname))
      ?.filter(Boolean)
      ?.reduce((acc, res) => Object.assign(acc, res), {}) ?? {}
  );
}

export function getCollectionSlugFromPathname() {
  return getPath().collectionSlug;
}

export function getCollectionItemSlugFromPathname() {
  return getPath().collectionItemSlug;
}
