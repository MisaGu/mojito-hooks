import { QueryKey } from '../../domain/utils/queryKeyFactory.util';
import { config } from '../../domain/constants/general.constants';
import { EMojitoKey } from '../../domain/enums/state.enum';
import { MojitoCollectionItemCurrentBidsResponse } from '../../domain/interfaces';
import { BaseQueryHookPropsWithUrlAndSlug } from '../../domain/interfaces/hooks.interface';
import { getCollectionSlug } from '../../domain/utils/getSlug.util';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

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
    queryKey: QueryKey.get(EMojitoKey.collectionBySlugCurrentBids, {
      slug,
      marketplaceID: config.MARKETPLACE_ID,
    }),
    options: { ...options, enabled: !!slug },
    selectorFn,
  });
}

export default useCollectionItemsCurrentBids;
