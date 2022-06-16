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
import { config } from '../../domain/constants/general.constants';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';
import { getCollectionSlug } from '../../domain/utils/getSlug.util';

function selectorFn(response) {
  if (!response) return undefined;
  return response.items || [];
}

export function useCollectionItemsCurrentBids(_a) {
  var options = _a.options,
    props = __rest(_a, ['options']);

  var slug = getCollectionSlug(props.slug);
  return useMojitoFactory({
    as: 'currentBids',
    query: EMojitoKey.collectionBySlugCurrentBids,
    variables: {
      slug: slug,
      marketplaceID: config.MARKETPLACE_ID,
    },
    options: __assign(__assign({}, options), {
      enabled: !!slug,
    }),
    selectorFn: selectorFn,
  });
}
export default useCollectionItemsCurrentBids;
