'use strict';

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

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.queryClient =
  exports.QUERY_CLIENT_STALE_TIME =
  exports.defaultQueryFn =
  exports.contentfulQueryFn =
  exports.mojitoQueryFn =
  exports.contentfulGqlClient =
  exports.mojitoGqlClient =
  exports.setOnErrorCallback =
    void 0;

var graphql_request_1 = require('graphql-request');

var react_query_1 = require('react-query');

var general_constants_1 = require('../constants/general.constants');

var isBrowser_util_1 = require('./isBrowser.util');

var gqlDataNormalizer_util_1 = require('./gqlDataNormalizer.util');

var queryKeyFactory_util_1 = require('./queryKeyFactory.util'); // TODO: Provide an example on how to use this to connect Sentry.

var onErrorCallback = function onErrorCallback(e) {
  console.log(e);
};

function setOnErrorCallback(customOnErrorCallback) {
  onErrorCallback = customOnErrorCallback;
}

exports.setOnErrorCallback = setOnErrorCallback;

function handleQueryError(e) {
  var _a, _b;

  var status = ((_a = e.response) === null || _a === void 0 ? void 0 : _a.status) || 0;
  onErrorCallback(e);

  if (isBrowser_util_1.isBrowser && status >= 500 && window.location.pathname !== '/500') {
    window.location.href = '/500';
  } else {
    if ((_b = e.response) === null || _b === void 0 ? void 0 : _b.error) {
      console.log(e.response.error);
    } // throw e.response.errors[0];

    throw e;
  }
}

exports.mojitoGqlClient = new graphql_request_1.GraphQLClient(
  general_constants_1.config.MOJITO_API_URL,
);
exports.contentfulGqlClient = new graphql_request_1.GraphQLClient(
  general_constants_1.config.CONTENTFUL_URL,
  {
    headers: {
      Authorization: 'Bearer '.concat(general_constants_1.config.CONTENTFUL_AUTH_TOKEN),
    },
  },
);

var mojitoQueryFn = function mojitoQueryFn(_a) {
  var queryKey = _a.queryKey;
  return __awaiter(void 0, void 0, void 0, function () {
    var _b, query, variables, mojitoQuery;

    return __generator(this, function (_c) {
      switch (_c.label) {
        case 0:
          (_b = __read(queryKey, 2)), (query = _b[0]), (variables = _b[1]);
          mojitoQuery = queryKeyFactory_util_1.QueryKey.getMojitoQuery(query);
          return [
            4,
            /*yield*/
            exports.mojitoGqlClient
              .request(mojitoQuery, variables)
              ['catch'](handleQueryError)
              .then(function (data) {
                return (0, gqlDataNormalizer_util_1.mojitoNormalizer)(data, variables);
              }),
          ];

        case 1:
          // console.log(`${mojitoQuery ? '🍸' : '❌'} MOJITO QUERY = ${query} => ${mojitoQuery}...`);
          // TODO: Add token with requestHeaders from request-client / mojitoGqlClient.setHeader("", token)
          return [
            2,
            /*return*/
            _c.sent(),
          ];
      }
    });
  });
};

exports.mojitoQueryFn = mojitoQueryFn;

var contentfulQueryFn = function contentfulQueryFn(_a) {
  var queryKey = _a.queryKey;
  return __awaiter(void 0, void 0, void 0, function () {
    var _b, query, variables, contentfulQuery;

    return __generator(this, function (_c) {
      switch (_c.label) {
        case 0:
          (_b = __read(queryKey, 2)), (query = _b[0]), (variables = _b[1]);
          contentfulQuery = queryKeyFactory_util_1.QueryKey.getContentfulQuery(query);
          return [
            4,
            /*yield*/
            exports.contentfulGqlClient
              .request(contentfulQuery, variables)
              ['catch'](handleQueryError)
              .then(function (data) {
                return (0, gqlDataNormalizer_util_1.contentfulNormalizer)(data, variables);
              }),
          ];

        case 1:
          // console.log(
          //   `${contentfulQuery ? '💾' : '❌'} CONTENTFUL QUERY = ${query} => ${contentfulQuery}...`,
          // );
          return [
            2,
            /*return*/
            _c.sent(),
          ];
      }
    });
  });
};

exports.contentfulQueryFn = contentfulQueryFn;

var defaultQueryFn = function defaultQueryFn(context) {
  var queryKey = context.queryKey;

  if (queryKeyFactory_util_1.QueryKey.isMojitoHooksKey(queryKey)) {
    var _a = __read(queryKey, 2),
      query = _a[0],
      variables = _a[1];

    var undefinedVars = Object.entries(
      variables !== null && variables !== void 0 ? variables : {},
    ).filter(function (pair) {
      return pair[1] === undefined;
    });

    if (undefinedVars.length > 0) {
      console.error(
        "Variables can't be undefined:",
        undefinedVars.map(function (pair) {
          return pair[0];
        }),
      );
      return null;
    }

    return queryKeyFactory_util_1.QueryKey.isContentful(query)
      ? (0, exports.contentfulQueryFn)(context)
      : (0, exports.mojitoQueryFn)(context);
  } // TODO: Add a fallback query function:

  return null;
};

exports.defaultQueryFn = defaultQueryFn; // TODO: Make this configurable by users:

exports.QUERY_CLIENT_STALE_TIME = 180000; // 3 MIN

exports.queryClient = new react_query_1.QueryClient({
  defaultOptions: {
    queries: {
      staleTime: isBrowser_util_1.isBrowser ? exports.QUERY_CLIENT_STALE_TIME : 0,
      cacheTime: Infinity,
      queryFn: exports.defaultQueryFn,
    },
  },
});
