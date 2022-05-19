import { EMojitoQueries } from '../../domain/gql/queries';
import { config } from '../../domain/constants/general.constants';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';
import { IIMojitoCollectionLotsIdList } from '../../domain/interfaces';
import { BaseQueryHookPropsWithUrlAndSlug } from '../../domain/interfaces/hooks.interface';
import { useCollectionSlug } from '../useCollectionSlug/useCollectionSlug';

function transformFn(collectionLotsIdList?: IIMojitoCollectionLotsIdList) {
  if (!collectionLotsIdList) return undefined;

  return collectionLotsIdList.items;
}

export type UseCollectionLotsIdListData = ReturnType<typeof transformFn>;

export type UseCollectionLotsIdListReturn = ReturnType<typeof useCollectionLotsIdList>;

export type UseCollectionLotsIdListProps =
  BaseQueryHookPropsWithUrlAndSlug<UseCollectionLotsIdListData>;

export function useCollectionLotsIdList({ options, ...props }: UseCollectionLotsIdListProps) {
  const { slug } = useCollectionSlug(props);

  return useMojitoFactory({
    as: 'collectionLotsIds',
    query: EMojitoQueries.collectionLotsIdList,
    variables: { slug, marketplaceID: config.MARKETPLACE_ID },
    options: { ...options, enabled: !!slug },
    transformFn,
  });

  // TODO: Normalizer should be updated here to make sure items only have id and name. All the extended fields should not be added.
}
