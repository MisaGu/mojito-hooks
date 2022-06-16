import { EMojitoKey } from '../../domain/enums/state.enum';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function selectorFn(response) {
  if (!response) return undefined;
  return response.me.favoriteItems;
}

export function useFavoriteItems(_a) {
  var _b = _a === void 0 ? {} : _a,
    options = _b.options;

  return useMojitoFactory({
    as: 'favoriteItems',
    query: EMojitoKey.userFavorites,
    options: options,
    selectorFn: selectorFn,
    onlyAuthenticated: true,
  });
}
export default useFavoriteItems;
