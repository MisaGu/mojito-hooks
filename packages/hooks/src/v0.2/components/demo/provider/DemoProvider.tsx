import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import { useEffect } from 'react';
import { config } from '../../../domain/constants/general.constants';
import { AuthProvider } from '../../../domain/context/auth.context';

interface DemoProviderProps {
  children: React.ReactNode;
}

export const DemoProviders: React.FC<DemoProviderProps> = ({ children }) => {
  useEffect(() => {
    console.log({
      TEST_ENV: config.TEST_ENV,
      AUTH0_DOMAIN: config.AUTH0_DOMAIN,
      AUTH0_CLIENTID: config.AUTH0_CLIENTID,
      AUTH_REDIRECT_URI: config.AUTH_REDIRECT_URI,
      API_HOSTNAME: config.API_HOSTNAME,
    });
  }, []);

  return (
    <Auth0Provider
      domain={config.AUTH0_DOMAIN}
      clientId={config.AUTH0_CLIENTID}
      redirectUri={config.AUTH_REDIRECT_URI}
    >
      <AuthProvider>{children}</AuthProvider>
    </Auth0Provider>
  );
};
