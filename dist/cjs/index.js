'use strict';

var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);

        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function get() {
              return m[k];
            },
          };
        }

        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });

var __exportStar =
  (this && this.__exportStar) ||
  function (m, exports) {
    for (var p in m) {
      if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports, p))
        __createBinding(exports, m, p);
    }
  };

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.setOnErrorCallback = exports.MojitoHooksProvider = void 0; // export * from './data';
// export * from './domain/enums';
// export * from './domain/general.constants';
// export * from './domain/interfaces';
// export * from './hooks';
// export * from './utils';

__exportStar(require('./v0.2/hooks'), exports);

var mojito_context_1 = require('./v0.2/domain/context/mojito.context');

Object.defineProperty(exports, 'MojitoHooksProvider', {
  enumerable: true,
  get: function get() {
    return mojito_context_1.MojitoHooksProvider;
  },
});

var gqlRequest_util_1 = require('./v0.2/domain/utils/gqlRequest.util');

Object.defineProperty(exports, 'setOnErrorCallback', {
  enumerable: true,
  get: function get() {
    return gqlRequest_util_1.setOnErrorCallback;
  },
});
