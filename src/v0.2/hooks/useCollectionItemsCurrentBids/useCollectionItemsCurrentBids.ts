import { EMojitoKey } from '../../domain/enums/state.enum';
import { config } from '../../domain/constants/general.constants';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';
import { MojitoCollectionItemCurrentBidsResponse } from '../../domain/interfaces';
import { BaseQueryHookPropsWithUrlAndSlug } from '../../domain/interfaces/hooks.interface';
import { getCollectionSlug } from '../../domain/utils/getSlug.util';

function selectorFn(response?: MojitoCollectionItemCurrentBidsResponse) {
  if (!response) return undefined;

  return response.items || [];
}

export type UseCollectionItemsCurrentBidsData = ReturnType<typeof selectorFn>;

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
    selectorFn,
  });
}

export default useCollectionItemsCurrentBids;