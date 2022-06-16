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

var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};

    for (var p in s) {
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }

    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  };

import { EMojitoKey } from '../../domain/enums/state.enum';
import { getCollectionSlug } from '../../domain/utils/getSlug.util';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function selectorFn(collectionItemRequest) {
  if (!collectionItemRequest) return undefined;
  return collectionItemRequest.collectionItemById.details.remainingCount;
}

export function useCollectionItemRemainingCount(_a) {
  var collectionItemID = _a.collectionItemID,
    options = _a.options,
    props = __rest(_a, ['collectionItemID', 'options']);

  var slug = getCollectionSlug(props.slug);
  return useMojitoFactory({
    as: 'remainingCount',
    query: EMojitoKey.collectionItemByIdRemainingCount,
    variables: {
      id: collectionItemID,
      slug: slug,
    },
    options: __assign(__assign({}, options), {
      enabled: !!slug,
    }),
    selectorFn: selectorFn,
    onlyAuthenticated: true,
  });
}
export default useCollectionItemRemainingCount;
