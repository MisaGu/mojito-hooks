import { IContentfulAuctionBySlugQuery } from '../../domain/interfaces';
import { BaseQueryHookPropsWithUrlAndSlug } from '../../domain/interfaces/hooks.interface';
import { useContentfulFactory } from '../useContentfulFactory/useContentfulFactory';
import { EContentfulQueries } from '../../domain/gql/contentful';
import { useCollectionSlug } from '../useCollectionSlug/useCollectionSlug';

function transformFn(auctionBySlug?: IContentfulAuctionBySlugQuery) {
  if (!auctionBySlug) return undefined;

  return auctionBySlug.auctionCollection?.items[0];
}

export type UseContentfulAuctionBySlugData = ReturnType<typeof transformFn>;

export type UseContentfulAuctionBySlugReturn = ReturnType<typeof useContentfulAuctionBySlug>;

export type UseContentfulAuctionBySlugProps =
  BaseQueryHookPropsWithUrlAndSlug<UseContentfulAuctionBySlugData>;

export function useContentfulAuctionBySlug({ options, ...props }: UseContentfulAuctionBySlugProps) {
  const { slug } = useCollectionSlug(props);

  return useContentfulFactory({
    as: 'lots',
    query: EContentfulQueries.auctionBySlug,
    variables: { slug },
    options: { ...options, enabled: !!slug },
    transformFn,
  });
}
