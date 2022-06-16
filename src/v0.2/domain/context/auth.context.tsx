import React from 'react';
import { mojitoGqlClient } from '../utils/gqlRequest.util';

/**
 * Actions list that manipulate the context provider
 */
export enum EAuthActionTypes {
  addToken,
  clearToken,
}

/**
 * Interface to describe the actions that manipulate the context provider
 */
interface AuthActionAdd {
  type: EAuthActionTypes.addToken;
  token: string;
}

interface AuthActionClear {
  type: EAuthActionTypes.clearToken;
}

type AuthActions = AuthActionAdd | AuthActionClear;

type AuthDispatch = (action: AuthActions) => void;

/**
 * Interface to describe the data contained within the context provider
 */
interface AuthState {
  token: string;
  isAuthenticated: boolean;
}

/**
 * Data the context provider shares during the initial render
 */
const initialState: AuthState = {
  token: '',
  isAuthenticated: false,
};

/**
 * Manipulate the state of the context provider
 * @param state current data contained within the context provider
 * @param action the event to manipulate the state
 * @returns updated state
 */
function Reducer(state: AuthState, action: AuthActions) {
  switch (action.type) {
    case EAuthActionTypes.addToken: {
      const { token } = action;

      if (!token) throw new Error(`action.token MUST be provided for: ${action.type}`);

      mojitoGqlClient.setHeader('authorization', `Bearer ${token}`);

      return {
        token,
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
      throw new Error(`Unhandled action type: ${(action as any).type}`);
    }
  }
}

// ========================================================= //
// ======================== FACTORY ======================== //
// ========================================================= //

const StateContext = React.createContext<{
  state?: AuthState;
  dispatch?: AuthDispatch;
}>({
  state: undefined,
  dispatch: undefined,
});

export function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [state, dispatch] = React.useReducer<React.Reducer<AuthState, AuthActions>>(
    Reducer,
    initialState,
  );

  return <StateContext.Provider value={{ state, dispatch }}>{children}</StateContext.Provider>;
}

export interface UseAuthContextReturn extends AuthState {
  dispatch: AuthDispatch;
}

export function useAuthContext(): UseAuthContextReturn {
  const context = React.useContext(StateContext);

  if (context.dispatch === undefined || context.state === undefined) {
    throw new Error('useContext must be used within a Provider');
  }

  return {
    ...context.state,
    dispatch: context.dispatch,
  };
}
