import React from 'react';
/**
 * Actions list that manipulate the context provider
 */
export declare enum EAuthActionTypes {
  addToken = 0,
  clearToken = 1,
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
declare type AuthActions = AuthActionAdd | AuthActionClear;
declare type AuthDispatch = (action: AuthActions) => void;
/**
 * Interface to describe the data contained within the context provider
 */
interface AuthState {
  token: string;
  isAuthenticated: boolean;
}
export declare function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element;
export interface UseAuthContextReturn extends AuthState {
  dispatch: AuthDispatch;
}
export declare function useAuthContext(): UseAuthContextReturn;
export {};
