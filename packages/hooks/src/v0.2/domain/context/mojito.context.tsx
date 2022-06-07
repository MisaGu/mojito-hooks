import React from 'react';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '../utils/gqlRequest.util';

export enum EUrlParams {
  collectionSlug,
  collectionItemSlug,
}

export interface MojitoHooksProviderProps {
  children: React.ReactNode;
  authToken?: any;
  urlPatterns?: any;
  onRouterChange?: () => void;
  onError?: () => void;
}

export const MojitoHooksProvider: React.FC<MojitoHooksProviderProps> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
