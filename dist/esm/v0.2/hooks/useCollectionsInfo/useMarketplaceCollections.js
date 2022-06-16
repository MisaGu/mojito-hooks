import { config } from '../../domain/constants/general.constants';
import { EMojitoKey } from '../../domain/enums/state.enum';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function selectorFn(response) {
  if (!response) return undefined;
  return response.marketplace.collections;
}

export function useMarketplaceCollections(_a) {
  var _b = _a === void 0 ? {} : _a,
    options = _b.options;

  return useMojitoFactory({
    as: 'collections',
    query: EMojitoKey.marketplaceCollectionsInfoWithItemsIdAndSlug,
    variables: {
      id: config.MARKETPLACE_ID,
    },
    options: options,
    selectorFn: selectorFn,
  });
}
export default useMarketplaceCollections;
