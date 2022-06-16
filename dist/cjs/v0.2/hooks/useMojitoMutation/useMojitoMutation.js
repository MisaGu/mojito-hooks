'use strict';

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

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.useMojitoMutation = void 0;

var react_1 = require('react');

var react_query_1 = require('react-query');

var auth_context_1 = require('../../domain/context/auth.context');

var gqlResult_utils_1 = require('../../domain/utils/gqlResult.utils');

var gqlRequest_util_1 = require('../../domain/utils/gqlRequest.util');

var queryKeyFactory_util_1 = require('../../domain/utils/queryKeyFactory.util');

function useMojitoMutation(_a) {
  var _this = this;

  var as = _a.as,
    query = _a.query,
    variables = _a.variables,
    options = _a.options,
    selectorFn = _a.selectorFn,
    onlyAuthenticated = _a.onlyAuthenticated,
    _b = _a.auto,
    auto = _b === void 0 ? true : _b;
  var isAuthenticated = (0, auth_context_1.useAuthContext)().isAuthenticated;
  var queryClient = (0, react_query_1.useQueryClient)();
  var mutationKey = queryKeyFactory_util_1.QueryKey.get(query, variables);
  var mutationFn = selectorFn
    ? function () {
        return __awaiter(_this, void 0, void 0, function () {
          var configuredQueryFn, result;

          var _a;

          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                configuredQueryFn =
                  (options === null || options === void 0 ? void 0 : options.queryFn) ||
                  ((_a = queryClient.getDefaultOptions().queries) === null || _a === void 0
                    ? void 0
                    : _a.queryFn) ||
                  gqlRequest_util_1.defaultQueryFn;
                return [
                  4,
                  /*yield*/
                  configuredQueryFn({
                    queryKey: mutationKey,
                    meta: undefined,
                  }),
                ];

              case 1:
                result = _b.sent();
                return [
                  2,
                  /*return*/
                  selectorFn ? selectorFn(result) : result,
                ];
            }
          });
        });
      }
    : options === null || options === void 0
    ? void 0
    : options.queryFn;

  var mojitoFactoryUseMutationOptions = __assign(__assign({}, options), {
    mutationFn: mutationFn,
    meta: __assign(__assign({}, options === null || options === void 0 ? void 0 : options.meta), {
      authorization: isAuthenticated,
    }),
  });

  if (!mutationFn) delete mojitoFactoryUseMutationOptions.mutationFn;
  var result = (0, react_query_1.useMutation)(mutationKey, mojitoFactoryUseMutationOptions);
  (0, react_1.useEffect)(
    function () {
      if (!auto || (onlyAuthenticated && !isAuthenticated)) return;
      result.mutate(variables);
    },
    [isAuthenticated, variables],
  );
  var normalizedResult = (0, gqlResult_utils_1.normalizeMutationResult)(as, result);
  var mutate = (0, react_1.useCallback)(
    function (variablesProp, context) {
      if (onlyAuthenticated && !isAuthenticated) Promise.resolve();
      return result.mutate(variablesProp || variables, context);
    },
    [isAuthenticated, result.mutate, variables],
  );
  var mutateAsync = (0, react_1.useCallback)(
    function (variablesProp, context) {
      if (onlyAuthenticated && !isAuthenticated) Promise.resolve();
      return result.mutateAsync(variablesProp || variables, context);
    },
    [isAuthenticated, result.mutateAsync, variables],
  );
  return __assign(__assign({}, normalizedResult), {
    mutate: mutate,
    mutateAsync: mutateAsync,
  });
}

exports.useMojitoMutation = useMojitoMutation; // legacy function

/*

export function useMojitoMutation<T = any, V = Variables>(
  query: EMojitoMutations,
  onlyAuthenticated = false,
): [UseMutationResult<T, any, V, any>['mutateAsync'], UseMutationResult<T, any, V, any>] {
  const { getIdTokenClaims } = useAuth0();
  const res = useMutation<T, any, V, any>(async (variables: V) => {
    const token = await getIdTokenClaims();
    if (token) {
      mojitoGqlClient.setHeader('authorization', `Bearer ${token.__raw}`);
    } else if (onlyAuthenticated) {
      return null;
    }

    if (Object.values(variables ?? {}).some((e) => !e)) {
      console.error('some of vars is undefined', variables);
      return null;
    }
    return await gqlRequest<T>({
      query: mojitoMutations[query],
      variables,
      normalizerFn: mojitoNormalizer,
      gqlClient: mojitoGqlClient,
    });
  });
  return [res.mutateAsync, res];
}


*/
