import { EContentfulQueries } from '../../domain/gql/contentful';
import { IContentfulAuction } from '../../domain/interfaces';
import { useContentful } from '../useContentful/useContentful';

export function useContentfulAuctionsSlugList() {
  return useContentful({
    query: EContentfulQueries.auctionsSlugList,
    as: 'auctionsSlugList',
  });

  // if (error) console.error(error);

  // auctionsSlugList: data?.auctionCollection?.items?.map((collection: IContentfulAuction) => collection.slug) ?? [],
}
