import { EContentfulQueries } from '../../domain/gql/contentful';
import { useContentfulFactory } from '../useContentfulFactory/useContentfulFactory';

export function useContentfulAuctionsSlugList() {
  return useContentfulFactory({
    query: EContentfulQueries.auctionsSlugList,
    as: 'auctionsSlugList',
  });

  // TODO: The old logic must go into the normalizer:
  // auctionsSlugList: data?.auctionCollection?.items?.map((collection: IContentfulAuction) => collection.slug) ?? [],
}
