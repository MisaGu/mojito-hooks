import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import { config } from '../../../domain/constants/general.constants';
import { MojitoHooksProvider } from '../../../index';

interface DemoInterfaceProps {
  demoComponent: React.ComponentType;
}

declare global {
  interface Window {
    token: string;
  }
}

const Authorize = ({ demoComponent: DemoComponent }) => {
  const { getIdTokenClaims, isAuthenticated, isLoading, loginWithPopup } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated && !window.token) loginWithPopup();
  }, []);

  useEffect(() => {
    if (isLoading || window.token) return;

    (async () => {
      const nextRawToken = await getIdTokenClaims();
      // eslint-disable-next-line no-underscore-dangle
      window.token = nextRawToken?.__raw || '';
    })();
  }, [isLoading, isAuthenticated]);

  return true ? (
    <MojitoHooksProvider
      config={{ AUTH_TOKEN: window.token, ...config }}
      onError={(e) => console.error(e.queryKey, e)}
    >
      <DemoComponent />
    </MojitoHooksProvider>
  ) : (
    <div>Authentication</div>
  );
};

export const DemoInterface: React.FC<DemoInterfaceProps> = ({ demoComponent: DemoComponent }) => {
  return (
    <Auth0Provider
      domain="https://accounts.staging.sothelabs.com"
      clientId="thTFyyXuq94Zr6nBIfEVnQ5iUwRlJsSg"
      redirectUri={'http://localhost:3000'}
    >
      <Authorize demoComponent={DemoComponent} />
    </Auth0Provider>
  );
};
