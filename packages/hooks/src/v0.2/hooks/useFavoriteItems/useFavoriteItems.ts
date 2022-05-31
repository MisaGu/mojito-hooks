import { EMojitoQueries } from '../../domain/gql/queries';
import { IMojitoFavoriteResponse } from '../../domain/interfaces';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function transformFn(response?: IMojitoFavoriteResponse | null) {
  if (!response) return undefined;

  return response.me.favoriteItems;
}

export type UseFavoriteItemsData = ReturnType<typeof transformFn>;

export type UseFavoriteItemsReturn = ReturnType<typeof useFavoriteItems>;

export type UseFavoriteItemsProps = BaseQueryHookProps<UseFavoriteItemsData>;

export function useFavoriteItems({ options }: UseFavoriteItemsProps = {}) {
  return useMojitoFactory({
    as: 'favoriteItems',
    query: EMojitoQueries.userFavorites,
    options,
    transformFn,
  });
}
