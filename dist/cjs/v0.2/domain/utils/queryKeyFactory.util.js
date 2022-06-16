'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.QueryKey = void 0;

var state_enum_1 = require('../enums/state.enum');

var contentful_1 = require('../gql/contentful');

var queries_1 = require('../gql/queries');

var QUERY_KEY_PREFIX = 'MOJITO-HOOKS::';
var QUERY_KEY_INFIX_OPT = ''.concat(QUERY_KEY_PREFIX, 'OPT::');
var QUERY_KEY_INFIX_MOJITO = ''.concat(QUERY_KEY_PREFIX, 'API::');
var QUERY_KEY_INFIX_CONTENTFUL = ''.concat(QUERY_KEY_PREFIX, 'CONTENTFUL::');

var QueryKey =
  /** @class */
  (function () {
    function QueryKey() {}

    QueryKey._removeQueryKeyPrefix = function (queryKey) {
      return queryKey.replace(/^MOJITO-HOOKS::(API|CONTENTFUL)::/, '');
    };

    QueryKey.isMojitoHooksKey = function (queryKey) {
      var _a;

      return (
        Array.isArray(queryKey) &&
        ((_a = queryKey[0]) === null || _a === void 0 ? void 0 : _a.includes(QUERY_KEY_PREFIX)) ===
          true
      );
    };

    QueryKey.get = function (query, variables) {
      var prefix = '';
      if (state_enum_1.EMojitoKey[query]) prefix = QUERY_KEY_INFIX_MOJITO;
      else if (state_enum_1.EContentfulKey[query]) prefix = QUERY_KEY_INFIX_CONTENTFUL;
      var queryKey = ''.concat(prefix).concat(query);
      return variables ? [queryKey, variables] : [queryKey];
    };

    QueryKey.getMojitoQuery = function (queryKey) {
      var mojitoQueryKey = QueryKey._removeQueryKeyPrefix(queryKey);

      return queries_1.mojitoQueries[mojitoQueryKey];
    };

    QueryKey.getContentfulQuery = function (queryKey) {
      var contentfulQueryKey = QueryKey._removeQueryKeyPrefix(queryKey);

      return contentful_1.contentfulQueries[contentfulQueryKey];
    };

    QueryKey.isOpt = function (queryKey) {
      return queryKey.startsWith(QUERY_KEY_INFIX_OPT);
    };

    QueryKey.isMojito = function (queryKey) {
      return queryKey.startsWith(QUERY_KEY_INFIX_MOJITO);
    };

    QueryKey.isContentful = function (queryKey) {
      return queryKey.startsWith(QUERY_KEY_INFIX_CONTENTFUL);
    };

    return QueryKey;
  })();

exports.QueryKey = QueryKey;
