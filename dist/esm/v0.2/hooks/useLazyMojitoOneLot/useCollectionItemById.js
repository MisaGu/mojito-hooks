var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
        }

        return t;
      };

    return __assign.apply(this, arguments);
  };

import { EMojitoKey } from '../../domain/enums/state.enum';
import { checkCollectionItemId } from '../../domain/utils/state/marketplaceCollectionsInfoWithItemsIdAndSlug.util';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function selectorFn(response) {
  if (!response) return undefined;
  return response.collectionItemById;
}

export function useCollectionItemById(_a) {
  var id = _a.id,
    options = _a.options;

  var _id = checkCollectionItemId(id);

  return useMojitoFactory({
    as: 'item',
    query: EMojitoKey.collectionItemById,
    variables: {
      id: _id,
    },
    options: __assign(__assign({}, options), {
      enabled: !!_id,
    }),
    selectorFn: selectorFn,
  });
}
export default useCollectionItemById;
