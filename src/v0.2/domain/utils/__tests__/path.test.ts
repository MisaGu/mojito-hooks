import { getCollectionSlugFromUrl, getItemSlugFromUrl } from '../state/path.util';

describe('getCollectionSlug()', () => {
  const location = window.location;
  const mockLocation = new URL('https://example.com/collection-slug/item/item-slug/');

  beforeAll(() => {
    delete (window as any).location;

    window.location = mockLocation as any;
  });

  afterAll(() => {
    window.location = location;
  });

  it('should be defined', () => {
    expect(getCollectionSlugFromUrl).toBeDefined();
  });

  it('works with slug', () => {
    expect(getCollectionSlugFromUrl({ slug: 'collection-slug' })).toBe('collection-slug');
  });

  it('works with pathname', () => {
    expect(getCollectionSlugFromUrl({ pathname: '/collection-slug/item/item-slug' })).toBe(
      'collection-slug',
    );
  });

  it('works without params', () => {
    expect(getCollectionSlugFromUrl()).toBe('collection-slug');
  });

  it('returns undefined in SSR/Node', () => {
    const location = window.location;

    delete (window as any).location;

    window.location = null as any;

    expect(getCollectionSlugFromUrl({ slug: 'collection-slug' })).toBe('collection-slug');
    expect(getCollectionSlugFromUrl({ pathname: '/collection-slug/item/item-slug' })).toBe(
      'collection-slug',
    );
    expect(getCollectionSlugFromUrl()).toBeUndefined();

    window.location = location;
  });
});

describe('getItemSlug()', () => {
  const location = window.location;
  const mockLocation = new URL('https://example.com/collection-slug/item/item-slug/');

  beforeAll(() => {
    delete (window as any).location;

    window.location = mockLocation as any;
  });

  afterAll(() => {
    window.location = location;
  });

  it('should be defined', () => {
    expect(getItemSlugFromUrl).toBeDefined();
  });

  it('works with slug', () => {
    expect(getItemSlugFromUrl({ slug: 'collection-slug' })).toBe('collection-slug');
  });

  it('works with pathname', () => {
    expect(getItemSlugFromUrl({ pathname: '/collection-slug/item/item-slug' })).toBe('item-slug');
  });

  it('works without params', () => {
    expect(getItemSlugFromUrl()).toBe('item-slug');
  });

  it('returns undefined in SSR/Node', () => {
    const location = window.location;

    delete (window as any).location;

    window.location = null as any;

    expect(getItemSlugFromUrl({ slug: 'item-slug' })).toBe('item-slug');
    expect(getItemSlugFromUrl({ pathname: '/collection-slug/item/item-slug' })).toBe('item-slug');
    expect(getItemSlugFromUrl()).toBeUndefined();

    window.location = location;
  });
});
