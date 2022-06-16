import React from 'react';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '../utils/gqlRequest.util';
export var EUrlParams;

(function (EUrlParams) {
  EUrlParams[(EUrlParams['collectionSlug'] = 0)] = 'collectionSlug';
  EUrlParams[(EUrlParams['collectionItemSlug'] = 1)] = 'collectionItemSlug';
})(EUrlParams || (EUrlParams = {}));

export var MojitoHooksProvider = function MojitoHooksProvider(_a) {
  var children = _a.children;
  return /*#__PURE__*/ React.createElement(
    QueryClientProvider,
    {
      client: queryClient,
    },
    children,
  );
};
