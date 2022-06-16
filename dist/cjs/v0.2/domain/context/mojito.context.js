'use strict';

var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule
      ? mod
      : {
          default: mod,
        };
  };

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.MojitoHooksProvider = exports.EUrlParams = void 0;

var react_1 = __importDefault(require('react'));

var react_query_1 = require('react-query');

var gqlRequest_util_1 = require('../utils/gqlRequest.util');

var EUrlParams;

(function (EUrlParams) {
  EUrlParams[(EUrlParams['collectionSlug'] = 0)] = 'collectionSlug';
  EUrlParams[(EUrlParams['collectionItemSlug'] = 1)] = 'collectionItemSlug';
})((EUrlParams = exports.EUrlParams || (exports.EUrlParams = {})));

var MojitoHooksProvider = function MojitoHooksProvider(_a) {
  var children = _a.children;
  return react_1['default'].createElement(
    react_query_1.QueryClientProvider,
    {
      client: gqlRequest_util_1.queryClient,
    },
    children,
  );
};

exports.MojitoHooksProvider = MojitoHooksProvider;
