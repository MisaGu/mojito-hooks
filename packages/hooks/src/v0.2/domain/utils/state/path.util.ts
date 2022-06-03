import { isBrowser } from '../isBrowser.util';

// TODO: the path should be taken from the react-query state that is updated by the MHP onRouterChange function

function getPath(): string[] {
  const pathnameParam = undefined; // THIS SHOULD BE A VALUE FROM THE STATE
  const pathname = pathnameParam || (isBrowser && location ? location.pathname : '');

  return pathname.split('/').filter(Boolean);
}

export function getCollectionSlugFromPathname() {
  return getPath()[0];
}

export function getCollectionItemSlugFromPathname() {
  return getPath()[2];
}
