import React from 'react';
import { AuthProvider } from '../../../domain/context/auth.context';

export const DemoProviders = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
