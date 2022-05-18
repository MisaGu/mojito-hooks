import { EContentfulQueries } from '../../domain/gql/contentful';
import { IContentfulAuction } from '../../domain/interfaces';
import { useContentful } from '../useContentful/useContentful';

export function useContentfulAuctionsSlugList() {
  return useContentful({
    query: EContentfulQueries.auctionsSlugList,
    as: 'auctionsSlugList',
  });

  // TODO: The old logic must go into the normalizer:
  // auctionsSlugList: data?.auctionCollection?.items?.map((collection: IContentfulAuction) => collection.slug) ?? [],
}
