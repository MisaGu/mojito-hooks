import { getCollectionSlug, getItemSlug } from '../path.util';

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
    expect(getCollectionSlug).toBeDefined();
  });

  it('works with slug', () => {
    expect(getCollectionSlug({ slug: 'collection-slug' })).toBe('collection-slug');
  });

  it('works with pathname', () => {
    expect(getCollectionSlug({ pathname: '/collection-slug/item/item-slug' })).toBe(
      'collection-slug',
    );
  });

  it('works without params', () => {
    expect(getCollectionSlug()).toBe('collection-slug');
  });

  it('returns undefined in SSR/Node', () => {
    const location = window.location;

    delete (window as any).location;

    window.location = null as any;

    expect(getCollectionSlug({ slug: 'collection-slug' })).toBe('collection-slug');
    expect(getCollectionSlug({ pathname: '/collection-slug/item/item-slug' })).toBe(
      'collection-slug',
    );
    expect(getCollectionSlug()).toBeUndefined();

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
    expect(getItemSlug).toBeDefined();
  });

  it('works with slug', () => {
    expect(getItemSlug({ slug: 'collection-slug' })).toBe('collection-slug');
  });

  it('works with pathname', () => {
    expect(getItemSlug({ pathname: '/collection-slug/item/item-slug' })).toBe('item-slug');
  });

  it('works without params', () => {
    expect(getItemSlug()).toBe('item-slug');
  });

  it('returns undefined in SSR/Node', () => {
    const location = window.location;

    delete (window as any).location;

    window.location = null as any;

    expect(getItemSlug({ slug: 'item-slug' })).toBe('item-slug');
    expect(getItemSlug({ pathname: '/collection-slug/item/item-slug' })).toBe('item-slug');
    expect(getItemSlug()).toBeUndefined();

    window.location = location;
  });
});
