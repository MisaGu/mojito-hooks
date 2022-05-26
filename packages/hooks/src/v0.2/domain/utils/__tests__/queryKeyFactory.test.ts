import { EContentfulQueries } from '../../gql/contentful';
import { EMojitoQueries } from '../../gql/queries';
import { QueryKey } from '../queryKeyFactory.util';

describe('QueryKey', () => {
  const mojitoQueryKey = QueryKey.get(EMojitoQueries.checkUsername, { username: 'test-username' });
  const contentfulQueryKey = QueryKey.get(EContentfulQueries.authors);

  it('should be defined', () => {
    expect(QueryKey).toBeDefined();
  });

  it('.get(...) generates query keys', () => {
    expect(mojitoQueryKey[0]).toBe('MOJITO-HOOKS::API::checkUsername');
    expect(mojitoQueryKey[1]).toMatchObject({ username: 'test-username' });

    expect(contentfulQueryKey[0]).toBe('MOJITO-HOOKS::CONTENTFUL::authors');
    expect(contentfulQueryKey[1]).toMatchObject({});
  });

  it('.getMojitoQuery(...) to return a Mojito GQL query', () => {
    expect(QueryKey.getMojitoQuery(mojitoQueryKey[0])).toMatch('query CheckUsername');
    expect(QueryKey.getContentfulQuery(mojitoQueryKey[0])).toBe(undefined);
  });

  it('.getContentfulQuery(...) to return a Contentgul GQL query', () => {
    expect(QueryKey.getContentfulQuery(contentfulQueryKey[0])).toMatch('query GetAuthors');
    expect(QueryKey.getMojitoQuery(contentfulQueryKey[0])).toBe(undefined);
  });

  it('.isMojito(...) to return true for Mojito query keys', () => {
    expect(QueryKey.isMojito(mojitoQueryKey[0])).toBe(true);
    expect(QueryKey.isContentful(mojitoQueryKey[0])).toBe(false);
  });

  it('.isContentful(...) to return true for Contentful query keys', () => {
    expect(QueryKey.isContentful(contentfulQueryKey[0])).toBe(true);
    expect(QueryKey.isMojito(contentfulQueryKey[0])).toBe(false);
  });

  it('.isMojitoHooksKey(...) to return true for both Mojito and Contentful query keys', () => {
    expect(QueryKey.isMojitoHooksKey(mojitoQueryKey)).toBe(true);
    expect(QueryKey.isMojitoHooksKey(contentfulQueryKey)).toBe(true);

    expect(QueryKey.isMojitoHooksKey(mojitoQueryKey[0])).toBe(false);
    expect(QueryKey.isMojitoHooksKey(contentfulQueryKey[0])).toBe(false);
    expect(QueryKey.isMojitoHooksKey([])).toBe(false);
    expect(QueryKey.isMojitoHooksKey(['FAKE-KEY'])).toBe(false);
    expect(QueryKey.isMojitoHooksKey('SOMETHING-ELSE')).toBe(false);
  });
});
