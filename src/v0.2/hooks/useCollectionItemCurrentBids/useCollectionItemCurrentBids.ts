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

export type UseCollectionItemCurrentBidData = ReturnType<typeof selectorFn>;

export type UseCollectionItemCurrentBidReturn = ReturnType<typeof useCollectionItemCurrentBid>;

export type UseCollectionItemCurrentBidProps =
  BaseQueryHookPropsWithUrlAndSlug<UseCollectionItemCurrentBidData> & {
    collectionItemID: string;
  };

export function useCollectionItemCurrentBid({
  collectionItemID,

  options,
  ...props
}: UseCollectionItemCurrentBidProps) {
  const slug = getCollectionSlug(props.slug);

  return useMojitoFactory({
    as: 'currentBids',
    query: EMojitoKey.collectionBySlugCurrentBids,
    variables: { slug, marketplaceID: config.MARKETPLACE_ID },
    options: { ...options, enabled: !!slug },
    selectorFn,
  });
}

export default useCollectionItemCurrentBid;
