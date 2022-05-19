import { EMojitoQueries } from '../../domain/gql/queries';
import { config } from '../../domain/constants/general.constants';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';
import {
  IIMojitoCollectionItemCurrentBidsRequest,
  IMojitoCollectionItem,
} from '../../domain/interfaces';
import { QueryResult } from '../../domain/utils/gql.utils';
import { BaseHookPropsWithUrlAndSlug } from '../../domain/interfaces/hooks.interface';
import { useCollectionSlug } from '../useCollectionSlug/useCollectionSlug';

export type UseCollectionLotsIdListData = undefined | Pick<IMojitoCollectionItem, 'id' | 'name'>[];

export type UseCollectionLotsIdListReturn = QueryResult<
  'collectionLotsIds',
  UseCollectionLotsIdListData
>;

export type UseCollectionLotsIdListProps = BaseHookPropsWithUrlAndSlug<UseCollectionLotsIdListData>;

// TODO: Memo this function:

function transformFn(
  collectionBySlug?: IIMojitoCollectionItemCurrentBidsRequest['collectionBySlug'],
): UseCollectionLotsIdListData {
  if (!collectionBySlug) return undefined;

  return (collectionBySlug.items || []) as unknown as UseCollectionLotsIdListData;
}

export function useCollectionLotsIdList({
  options,
  ...props
}: UseCollectionLotsIdListProps): UseCollectionLotsIdListReturn {
  const { slug } = useCollectionSlug(props);

  return useMojitoFactory({
    as: 'collectionLotsIds',
    query: EMojitoQueries.collectionLotsIdList,
    variables: { slug, marketplaceID: config.MARKETPLACE_ID },
    options: { ...(options as any), enabled: !!slug },
    transformFn,
  });

  // TODO: Normalizer should be updated here to make sure items only have id and name. All the extended fields should
  // not be added

  // TODO: The old logic must go into the normalizer:
  // collectionLotsIds: Pick<IMojitoCollectionItem, 'id' | 'name'>[];
  // data?.items ?? []
}
