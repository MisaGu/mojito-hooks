import { EContentfulQueries } from '../../domain/gql/contentful';
import { IUseQueryResult } from '../../domain/gql/queries';
import { IContentfulAuction } from '../../domain/interfaces';
import { useContentful } from '../useContentful/useContentful';

export function useContentfulAuctionsSlugList(): {
  auctionsSlugList: string[];
  auctionsSlugListLoading: boolean;
  auctionsSlugListError: IUseQueryResult['error'];
} {
  const { data, error, isLoading } = useContentful(EContentfulQueries.auctionsSlugList);

  // if (error) console.error(error);

  return {
    auctionsSlugList:
      data?.auctionCollection?.items?.map((collection: IContentfulAuction) => collection.slug) ??
      [],
    auctionsSlugListLoading: isLoading,
    auctionsSlugListError: error,
  };
}
