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
exports.TestWrapper = void 0;

var react_1 = __importDefault(require('react'));

var auth_context_1 = require('../../../domain/context/auth.context');

var DemoInterface_1 = require('../../demo/Interface/DemoInterface');

var TestWrapper = function TestWrapper(_a) {
  var children = _a.children;

  var DemoContent = function DemoContent() {
    return react_1['default'].createElement(react_1['default'].Fragment, null, children || null);
  };

  return react_1['default'].createElement(
    auth_context_1.AuthProvider,
    null,
    react_1['default'].createElement(DemoInterface_1.DemoInterface, {
      demoComponent: DemoContent,
    }),
  );
};

exports.TestWrapper = TestWrapper;
