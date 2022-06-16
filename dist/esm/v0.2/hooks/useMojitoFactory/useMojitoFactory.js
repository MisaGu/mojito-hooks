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

import isEqual from 'lodash.isequal';
import { useEffect, useRef, useState } from 'react';
import { QueryObserver, useQueryClient } from 'react-query';
import { useAuthContext } from '../../domain/context/auth.context';
import { defaultQueryFn } from '../../domain/utils/gqlRequest.util';
import { normalizeQueryResult } from '../../domain/utils/gqlResult.utils';
import { QueryKey } from '../../domain/utils/queryKeyFactory.util';
export function useMojitoFactory(_a) {
  var _this = this;

  var as = _a.as,
    query = _a.query,
    variables = _a.variables,
    options = _a.options,
    preloadFn = _a.preloadFn,
    selectorFn = _a.selectorFn,
    _b = _a.force,
    force = _b === void 0 ? false : _b,
    onlyAuthenticated = _a.onlyAuthenticated;
  var queryClient = useQueryClient();
  var isAuthenticated = useAuthContext().isAuthenticated; // REPLACE ME

  var _unsubscribe = useRef();

  var queryKey = QueryKey.get(query, variables);

  var queryOptions = __assign(__assign({}, options), {
    queryKey: queryKey,
    queryFn: function queryFn() {
      return __awaiter(_this, void 0, void 0, function () {
        var configuredQueryFn;

        var _a;

        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              if (!preloadFn)
                return [
                  3, /*break*/
                  2,
                ];
              return [
                4,
                /*yield*/
                preloadFn(),
              ];

            case 1:
              _b.sent();

              _b.label = 2;

            case 2:
              configuredQueryFn =
                (options === null || options === void 0 ? void 0 : options.queryFn) ||
                ((_a = queryClient.getDefaultOptions().queries) === null || _a === void 0
                  ? void 0
                  : _a.queryFn) ||
                defaultQueryFn;
              return [
                4,
                /*yield*/
                configuredQueryFn({
                  queryKey: queryKey,
                  meta: undefined,
                }),
              ];

            case 3:
              return [
                2,
                /*return*/
                _b.sent(),
              ];
          }
        });
      });
    },
    meta: __assign(__assign({}, options === null || options === void 0 ? void 0 : options.meta), {
      authorization: isAuthenticated,
    }),
    enabled:
      (options === null || options === void 0 ? void 0 : options.enabled) !== false &&
      (!onlyAuthenticated || isAuthenticated),
  });

  var observer = useRef(new QueryObserver(queryClient, queryOptions));

  var _result = observer.current.getCurrentResult();

  var _c = __read(
      useState(
        selectorFn ? (_result.data ? selectorFn(_result.data) : _result.data) : _result.data,
      ),
      2,
    ),
    data = _c[0],
    setData = _c[1];

  useEffect(
    function () {
      var _a;

      if (force) {
        queryClient.removeQueries(queryKey);
      }

      (_a = _unsubscribe.current) === null || _a === void 0 ? void 0 : _a.call(_unsubscribe);
      observer.current = new QueryObserver(queryClient, queryOptions);
      return function () {
        var _a;

        return (_a = observer.current) === null || _a === void 0 ? void 0 : _a.destroy();
      };
    },
    [JSON.stringify(queryKey), isAuthenticated, force],
  );
  useEffect(
    function () {
      _unsubscribe.current = observer.current.subscribe(function (result) {
        if (selectorFn) {
          console.log(result);

          if (result.data) {
            var _selectorResult = selectorFn(result.data);

            if (!isEqual(_selectorResult, data)) {
              setData(_selectorResult);
            }
          }
        } else {
          setData(result.data);
        }
      });
      return function () {
        var _a;

        return (_a = _unsubscribe.current) === null || _a === void 0
          ? void 0
          : _a.call(_unsubscribe);
      };
    },
    [observer.current],
  ); //@ts-ignore

  _result.data = data;
  return normalizeQueryResult(as, _result);
}
