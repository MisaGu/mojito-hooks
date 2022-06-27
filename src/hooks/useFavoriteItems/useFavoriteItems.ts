import { QueryKey } from '../../domain/utils/queryKeyFactory.util';
import { EMojitoKey } from '../../domain/enums/state.enum';
import { FavoriteResponse } from '../../domain/interfaces';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function selectorFn(response?: FavoriteResponse) {
  if (!response) return undefined;

  return response.me.favoriteItems;
}

export type UseFavoriteItemsData = ReturnType<typeof selectorFn>;

export type UseFavoriteItemsReturn = ReturnType<typeof useFavoriteItems>;

export type UseFavoriteItemsProps = BaseQueryHookProps<UseFavoriteItemsData>;

export function useFavoriteItems({ options }: UseFavoriteItemsProps = {}) {
  return useMojitoFactory({
    as: 'favoriteItems',
    queryKey: QueryKey.get(EMojitoKey.userFavorites),
    options,
    selectorFn,
    onlyAuthenticated: true,
  });
}

export default useFavoriteItems;
