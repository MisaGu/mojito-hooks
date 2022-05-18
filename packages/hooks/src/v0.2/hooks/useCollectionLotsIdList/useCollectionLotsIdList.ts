import { EMojitoQueries } from '../../domain/gql/queries';
import { IMojitoCollectionItem } from '../../domain/interfaces';
import { config } from '../../domain/constants/general.constants';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

export function useCollectionLotsIdList(slug: string) {
  return useMojitoFactory({
    as: 'collectionLotsIds',
    query: EMojitoQueries.collectionLotsIdList,
    variables: { slug, marketplaceID: config.MARKETPLACE_ID },
  });

  // collectionLotsIds: Pick<IMojitoCollectionItem, 'id' | 'name'>[];

  // data?.items ?? []
}
