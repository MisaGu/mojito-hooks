import { Auth0Provider } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import { config } from '../../../domain/constants/general.constants';
import { AuthProvider } from '../../../domain/context/auth.context';
import { enableLogs } from '../../../domain/utils/log.utils';

interface DemoProviderProps {
  children: React.ReactNode;
}

export const DemoProviders: React.FC<DemoProviderProps> = ({ children }) => {
  /*
  useEffect(() => {
    log({
      TEST_ENV: config.TEST_ENV,
      AUTH0_DOMAIN: config.AUTH0_DOMAIN,
      AUTH0_CLIENTID: config.AUTH0_CLIENTID,
      AUTH_REDIRECT_URI: config.AUTH_REDIRECT_URI,
    });
  }, []);
  */

  useEffect(() => {
    enableLogs();
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
