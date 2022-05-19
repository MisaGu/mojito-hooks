import { EContentfulQueries } from '../../domain/gql/contentful';
import { IContentfulAuctionsSlugListQuery } from '../../domain/interfaces';
import { BaseHookProps } from '../../domain/interfaces/hooks.interface';
import { useContentfulFactory } from '../useContentfulFactory/useContentfulFactory';

function transformFn(auctionsSlugListQuery?: IContentfulAuctionsSlugListQuery) {
  if (!auctionsSlugListQuery) return undefined;

  return auctionsSlugListQuery.auctionCollection.items.map((item) => item.slug);
}

export type UseContentfulAuctionsSlugListData = ReturnType<typeof transformFn>;

export type UseContentfulAuctionsSlugListReturn = ReturnType<typeof useContentfulAuctionsSlugList>;

export type UseContentfulAuctionsSlugListProps = BaseHookProps<UseContentfulAuctionsSlugListData>;

export function useContentfulAuctionsSlugList({
  options,
}: UseContentfulAuctionsSlugListProps = {}) {
  return useContentfulFactory({
    query: EContentfulQueries.auctionsSlugList,
    as: 'auctionsSlugList',
    options,
    transformFn,
  });
}
