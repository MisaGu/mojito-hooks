import { isBrowser } from './isBrowser.util';

export function getPath(pathname: string = window.location.pathname): string[] {
  if (isBrowser) return [];

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
