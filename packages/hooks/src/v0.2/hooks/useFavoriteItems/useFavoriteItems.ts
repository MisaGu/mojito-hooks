import { config } from '../../domain/constants/general.constants';
import { EMojitoQueries } from '../../domain/gql/queries';
import { IMojitoCollectionItem, IMojitoFavoriteRequest } from '../../domain/interfaces';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
import { QueryResult } from '../../domain/utils/gql.utils';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

export type UseFavoriteItemsData = undefined | null | IMojitoCollectionItem[];

export type UseFavoriteItemsReturn = QueryResult<'favoriteItems', UseFavoriteItemsData>;

export type UseFavoriteItemsProps = BaseQueryHookProps<IMojitoFavoriteRequest>;

function transformFn(
  favoriteItemsRequest?: undefined | null | IMojitoFavoriteRequest,
): UseFavoriteItemsData {
  if (!favoriteItemsRequest) return undefined;

  return favoriteItemsRequest?.me?.favoriteItems;
}

export function useFavoriteItems({ options }: UseFavoriteItemsProps = {}): UseFavoriteItemsReturn {
  return useMojitoFactory<'favoriteItems', IMojitoFavoriteRequest, UseFavoriteItemsData>({
    as: 'favoriteItems',
    query: EMojitoQueries.userFavorites,
    variables: {
      organizationID: config.ORGANIZATION_ID,
    },
    options,
    transformFn,
  });
}
