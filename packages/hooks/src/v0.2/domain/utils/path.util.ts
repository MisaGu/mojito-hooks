import { isBrowser } from './isBrowser.util';

function getPath(pathnameParam?: string): string[] {
  const pathname = pathnameParam || (isBrowser && location ? location.pathname : '');

  return pathname.split('/').filter(Boolean);
}

export interface GetSlugOptions {
  pathname?: string;
  slug?: string;
}

export function getCollectionSlug({ pathname, slug }: GetSlugOptions = {}) {
  return slug ? slug : getPath(pathname)[0];
}

export function getItemSlug({ pathname, slug }: GetSlugOptions = {}) {
  return slug ? slug : getPath(pathname)[2];
}
