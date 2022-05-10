import React from 'react';

/**
 * Actions list that manipulate the context provider
 */
export enum EAuthContextActionTypes {
  addIdToken,
}

/**
 * Interface to describe the actions that manipulate the context provider
 */
interface IAction {
  type: EAuthContextActionTypes;
  token?: string;
}

/**
 * Interface to describe the data contained within the context provider
 */
interface State {
  token: string;
  isAuthenticated: boolean;
}

/**
 * Data the context provider shares during the initial render
 */
const initialState: State = {
  token: '',
  isAuthenticated: false,
};

/**
 * Manipulate the state of the context provider
 * @param state current data contained within the context provider
 * @param action the event to manipulate the state
 * @returns updated state
 */
function Reducer(state: State, action: IAction) {
  switch (action.type) {
    case EAuthContextActionTypes.addIdToken: {
      if (!action.token) throw new Error(`action.token MUST be provided for: ${action.type}`);

      return {
        ...state,
        token: action.token,
        isAuthenticated: !!action.token,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export const AuthProvider = Provider;
export const useAuthContext = useContext;

// ========================================================= //
// ======================== FACTORY ======================== //
// ========================================================= //

type IDispatch = (action: IAction) => void;

const StateContext = React.createContext<{
  state?: State;
  dispatch?: IDispatch;
}>({
  state: undefined,
  dispatch: undefined,
});

function Provider({ children }: { children: React.ReactNode }): JSX.Element {
  const [state, dispatch] = React.useReducer<React.Reducer<State, IAction>>(Reducer, initialState);

  return <StateContext.Provider value={{ state, dispatch }}>{children}</StateContext.Provider>;
}

function useContext(): {
  state: State;
  dispatch: IDispatch;
} {
  const context = React.useContext(StateContext);
  if (context.dispatch === undefined || context.state === undefined) {
    throw new Error('useContext must be used within a Provider');
  }
  return {
    state: context.state,
    dispatch: context.dispatch,
  };
}
