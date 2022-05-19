import { EMojitoQueries } from '../../domain/gql/queries';
import { config } from '../../domain/constants/general.constants';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';
import { IIMojitoCollectionItemCurrentBids } from '../../domain/interfaces';
import { BaseHookPropsWithUrlAndSlug } from '../../domain/interfaces/hooks.interface';
import { useCollectionSlug } from '../useCollectionSlug/useCollectionSlug';

function transformFn(collectionItemCurrentBids?: IIMojitoCollectionItemCurrentBids) {
  if (!collectionItemCurrentBids) return undefined;

  return collectionItemCurrentBids.items || [];
}

export type UseCollectionItemsCurrentBidsData = ReturnType<typeof transformFn>;

export type UseCollectionItemsCurrentBidsReturn = ReturnType<typeof useCollectionItemsCurrentBids>;

export type UseCollectionItemsCurrentBidsProps =
  BaseHookPropsWithUrlAndSlug<UseCollectionItemsCurrentBidsData>;

export function useCollectionItemsCurrentBids({
  options,
  ...props
}: UseCollectionItemsCurrentBidsProps) {
  const { slug } = useCollectionSlug(props);

  return useMojitoFactory({
    as: 'currentBids',
    query: EMojitoQueries.collectionBySlugCurrentBids,
    variables: { slug, marketplaceID: config.MARKETPLACE_ID },
    options: { ...options, enabled: !!slug },
    transformFn,
  });
}
