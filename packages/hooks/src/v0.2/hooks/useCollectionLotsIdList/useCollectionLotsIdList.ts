import { EMojitoQueries, IUseQueryResult } from '../../domain/gql/queries';
import { IMojitoCollectionItem } from '../../domain/interfaces';
import { config } from '../../../domain/general.constants';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

export function useCollectionLotsIdList(slug: string): {
  collectionLotsIdList: Pick<IMojitoCollectionItem, 'id' | 'name'>[];
  collectionLoading: boolean;
  collectionError: IUseQueryResult['error'];
} {
  const { data, error, loading } = useMojitoFactory({
    query: EMojitoQueries.collectionLotsIdList,
    variables: { slug, marketplaceID: config.MARKETPLACE_ID },
  });

  // if (error) console.error(error);

  return {
    collectionLotsIdList: data?.items ?? [],
    collectionLoading: loading,
    collectionError: error,
  };
}
