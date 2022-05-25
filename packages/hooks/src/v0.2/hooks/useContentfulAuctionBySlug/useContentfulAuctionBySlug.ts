import { IContentfulAuctionBySlugQuery } from '../../domain/interfaces';
import { BaseQueryHookPropsWithUrlAndSlug } from '../../domain/interfaces/hooks.interface';
import { useContentfulFactory } from '../useContentfulFactory/useContentfulFactory';
import { EContentfulQueries } from '../../domain/gql/contentful';
import { useCollectionSlug } from '../useCollectionSlug/useCollectionSlug';

function transformFn(auctionBySlug?: IContentfulAuctionBySlugQuery) {
  if (!auctionBySlug) return undefined;

  return auctionBySlug.auctionCollection?.items[0];
}

export type UseAuctionBySlugData = ReturnType<typeof transformFn>;

export type UseAuctionBySlugReturn = ReturnType<typeof useContentfulAuctionBySlug>;

export type UseAuctionBySlugProps = BaseQueryHookPropsWithUrlAndSlug<UseAuctionBySlugData>;

export function useContentfulAuctionBySlug({ options, ...props }: UseAuctionBySlugProps) {
  const { slug } = useCollectionSlug(props);

  return useContentfulFactory({
    as: 'lots',
    query: EContentfulQueries.auctionBySlug,
    variables: { slug },
    options: { ...options, enabled: !!slug },
    transformFn,
  });
}
