var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }

      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }

      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }

      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };

var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function sent() {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2),
      }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );

    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }

    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');

      while (_) {
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];

          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;

            case 4:
              _.label++;
              return {
                value: op[1],
                done: false,
              };

            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;

            case 7:
              op = _.ops.pop();

              _.trys.pop();

              continue;

            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }

              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }

              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }

              if (t && _.label < t[2]) {
                _.label = t[2];

                _.ops.push(op);

                break;
              }

              if (t[2]) _.ops.pop();

              _.trys.pop();

              continue;
          }

          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      }

      if (op[0] & 5) throw op[1];
      return {
        value: op[0] ? op[1] : void 0,
        done: true,
      };
    }
  };

var __read =
  (this && this.__read) ||
  function (o, n) {
    var m = typeof Symbol === 'function' && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
      r,
      ar = [],
      e;

    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
        ar.push(r.value);
      }
    } catch (error) {
      e = {
        error: error,
      };
    } finally {
      try {
        if (r && !r.done && (m = i['return'])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }

    return ar;
  };

import { useQueryClient } from 'react-query';
import { config } from '../../domain/constants/general.constants';
import { getCollectionSlugFromPathname } from '../../domain/utils/state/path.util';
import { EMojitoKey } from '../../domain/enums/state.enum';
import { EContentfulKey } from '../../domain/enums/state.enum';
import { QueryKey } from '../../domain/utils/queryKeyFactory.util';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function selectorFn(response) {
  if (!response) return undefined;
  return response.collectionBySlug;
}

export function useCollection(props) {
  var queryClient = useQueryClient();
  var collectionSlug = getCollectionSlugFromPathname();

  function preloadFn() {
    return __awaiter(this, void 0, void 0, function () {
      var _a,
        mojitoCollections,
        contentfulCollectionSlugsOnly,
        mojitoCollection,
        contentfulCollection,
        collectionItems;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [
              4,
              /*yield*/
              Promise.all([
                queryClient.fetchQuery(
                  QueryKey.get(EMojitoKey.marketplaceCollectionsInfoWithItemsIdAndSlug, {
                    id: config.MARKETPLACE_ID,
                  }),
                ),
                queryClient.fetchQuery(QueryKey.get(EContentfulKey.auctionsSlugList)),
              ]),
            ];

          case 1:
            (_a = __read.apply(void 0, [_b.sent(), 2])),
              (mojitoCollections = _a[0]),
              (contentfulCollectionSlugsOnly = _a[1]);
            console.log(mojitoCollections);
            mojitoCollection = mojitoCollections.marketplace.collections.find(function (
              collection,
            ) {
              return collection.slug == collectionSlug;
            });
            contentfulCollection = contentfulCollectionSlugsOnly.auctionCollection.items.find(
              function (collection) {
                return collection.slug == collectionSlug;
              },
            );
            if (!mojitoCollection)
              return [
                2,
                /*return*/
              ];
            if (!contentfulCollection)
              return [
                3, /*break*/
                3,
              ];
            collectionItems = mojitoCollection.items.map(function (item) {
              return item.id;
            });
            return [
              4,
              /*yield*/
              Promise.all([
                queryClient.prefetchQuery(
                  QueryKey.get(EContentfulKey.auctionBySlug, {
                    slug: collectionSlug,
                  }),
                ),
                queryClient.prefetchQuery(
                  QueryKey.get(EContentfulKey.shortLots, {
                    mojitoIds: collectionItems,
                  }),
                ),
              ]),
            ];

          case 2:
            _b.sent();

            _b.label = 3;

          case 3:
            return [
              2,
              /*return*/
            ];
        }
      });
    });
  }

  return useMojitoFactory({
    as: 'collection',
    query: EMojitoKey.collectionBySlug,
    variables: {
      slug: collectionSlug,
      marketplaceID: config.MARKETPLACE_ID,
    },
    options: props === null || props === void 0 ? void 0 : props.options,
    preloadFn: preloadFn,
    selectorFn: selectorFn,
  });
}
export default useCollection;
