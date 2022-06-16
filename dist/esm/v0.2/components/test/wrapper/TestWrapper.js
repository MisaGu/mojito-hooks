import React from 'react';
import { AuthProvider } from '../../../domain/context/auth.context';
import { DemoInterface } from '../../demo/Interface/DemoInterface';
export var TestWrapper = function TestWrapper(_a) {
  var children = _a.children;

  var DemoContent = function DemoContent() {
    return /*#__PURE__*/ React.createElement(React.Fragment, null, children || null);
  };

  return /*#__PURE__*/ React.createElement(
    AuthProvider,
    null,
    /*#__PURE__*/ React.createElement(DemoInterface, {
      demoComponent: DemoContent,
    }),
  );
};
