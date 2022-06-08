import { EMojitoKey } from '../../domain/enums/state.enum';
import { config } from '../../domain/constants/general.constants';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';
import { IIMojitoCollectionItemCurrentBids } from '../../domain/interfaces';
import { BaseQueryHookPropsWithUrlAndSlug } from '../../domain/interfaces/hooks.interface';
import { getCollectionSlug } from '../../domain/utils/getSlug.util';

function transformFn(collectionItemCurrentBids?: IIMojitoCollectionItemCurrentBids) {
  if (!collectionItemCurrentBids) return undefined;

  return collectionItemCurrentBids.items || [];
}

export type UseCollectionItemsCurrentBidsData = ReturnType<typeof transformFn>;

export type UseCollectionItemsCurrentBidsReturn = ReturnType<typeof useCollectionItemsCurrentBids>;

export type UseCollectionItemsCurrentBidsProps =
  BaseQueryHookPropsWithUrlAndSlug<UseCollectionItemsCurrentBidsData>;

export function useCollectionItemsCurrentBids({
  options,
  ...props
}: UseCollectionItemsCurrentBidsProps) {
  const slug = getCollectionSlug(props.slug);

  return useMojitoFactory({
    as: 'currentBids',
    query: EMojitoKey.collectionBySlugCurrentBids,
    variables: { slug, marketplaceID: config.MARKETPLACE_ID },
    options: { ...options, enabled: !!slug },
    transformFn,
  });
}

export default useCollectionItemsCurrentBids;
