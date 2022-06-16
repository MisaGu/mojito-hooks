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

import React from 'react';
import { mojitoGqlClient } from '../utils/gqlRequest.util';
/**
 * Actions list that manipulate the context provider
 */

export var EAuthActionTypes;

(function (EAuthActionTypes) {
  EAuthActionTypes[(EAuthActionTypes['addToken'] = 0)] = 'addToken';
  EAuthActionTypes[(EAuthActionTypes['clearToken'] = 1)] = 'clearToken';
})(EAuthActionTypes || (EAuthActionTypes = {}));
/**
 * Data the context provider shares during the initial render
 */

var initialState = {
  token: '',
  isAuthenticated: false,
};
/**
 * Manipulate the state of the context provider
 * @param state current data contained within the context provider
 * @param action the event to manipulate the state
 * @returns updated state
 */

function Reducer(state, action) {
  switch (action.type) {
    case EAuthActionTypes.addToken: {
      var token = action.token;
      if (!token) throw new Error('action.token MUST be provided for: '.concat(action.type));
      mojitoGqlClient.setHeader('authorization', 'Bearer '.concat(token));
      return {
        token: token,
        isAuthenticated: true,
      };
    }

    case EAuthActionTypes.clearToken: {
      return {
        token: '',
        isAuthenticated: false,
      };
    }

    default: {
      throw new Error('Unhandled action type: '.concat(action.type));
    }
  }
} // ========================================================= //
// ======================== FACTORY ======================== //
// ========================================================= //

var StateContext = /*#__PURE__*/ React.createContext({
  state: undefined,
  dispatch: undefined,
});
export function AuthProvider(_a) {
  var children = _a.children;

  var _b = __read(React.useReducer(Reducer, initialState), 2),
    state = _b[0],
    dispatch = _b[1];

  return /*#__PURE__*/ React.createElement(
    StateContext.Provider,
    {
      value: {
        state: state,
        dispatch: dispatch,
      },
    },
    children,
  );
}
export function useAuthContext() {
  var context = React.useContext(StateContext);

  if (context.dispatch === undefined || context.state === undefined) {
    throw new Error('useContext must be used within a Provider');
  }

  return __assign(__assign({}, context.state), {
    dispatch: context.dispatch,
  });
}
