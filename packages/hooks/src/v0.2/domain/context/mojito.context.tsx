import React from 'react';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '../utils/gqlRequest.util';

export interface MojitoHooksProviderProps {
  children: React.ReactNode;
}

export const MojitoHooksProvider: React.FC<MojitoHooksProviderProps> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
