import { EMojitoQueries } from '../../domain/gql/queries';
import { config } from '../../domain/constants/general.constants';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';
import {
  IIMojitoCollectionItemCurrentBidsRequest,
  IMojitoCollectionItemCurrentBids,
} from '../../domain/interfaces';
import { QueryResult } from '../../domain/utils/gql.utils';
import { BaseHookPropsWithUrlAndSlug } from '../../domain/interfaces/hooks.interface';
import { useCollectionSlug } from '../useCollectionSlug/useCollectionSlug';

export type UseCollectionItemsCurrentBidsData = undefined | IMojitoCollectionItemCurrentBids[];

export type UseCollectionItemsCurrentBidsReturn = QueryResult<
  'currentBids',
  UseCollectionItemsCurrentBidsData
>;

export type UseCollectionItemsCurrentBidsProps =
  BaseHookPropsWithUrlAndSlug<UseCollectionItemsCurrentBidsData>;

// TODO: Memo this function:

function transformFn(
  collectionBySlugBids?: IIMojitoCollectionItemCurrentBidsRequest['collectionBySlug'],
): UseCollectionItemsCurrentBidsData {
  if (!collectionBySlugBids) return undefined;

  return collectionBySlugBids.items || [];
}

export function useCollectionItemsCurrentBids({
  options,
  ...props
}: UseCollectionItemsCurrentBidsProps): UseCollectionItemsCurrentBidsReturn {
  const { slug } = useCollectionSlug(props);

  return useMojitoFactory<
    'currentBids',
    IIMojitoCollectionItemCurrentBidsRequest['collectionBySlug'],
    IMojitoCollectionItemCurrentBids[]
  >({
    as: 'currentBids',
    query: EMojitoQueries.collectionBySlugCurrentBids,
    variables: { slug, marketplaceID: config.MARKETPLACE_ID },
    options: { ...(options as any), enabled: !!slug },
    transformFn,
  });
}
