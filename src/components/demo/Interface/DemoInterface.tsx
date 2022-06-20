import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { MojitoHooksProvider } from '../../../index';

interface DemoInterfaceProps {
  demoComponent: React.ComponentType;
}

const Authorize = ({ demoComponent: DemoComponent }) => {
  const { getIdTokenClaims, isAuthenticated, isLoading, loginWithPopup } = useAuth0();
  const [token, setToken] = useState('');

  useEffect(() => {
    console.log(isAuthenticated);
    if (!isAuthenticated) loginWithPopup();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    (async () => {
      const nextRawToken = await getIdTokenClaims();

      // eslint-disable-next-line no-underscore-dangle
      setToken(nextRawToken?.__raw || '');
    })();
  }, [isLoading, isAuthenticated]);

  return token ? (
    <MojitoHooksProvider
      authorization={{
        authorization: `Bearer ${token}`,
      }}
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
      domain="mojito-nft.us.auth0.com"
      clientId="CB4YDesBiCxOtO0tTGWFCvu92qobalfI"
      redirectUri={window.location.origin}
    >
      <Authorize demoComponent={DemoComponent} />
    </Auth0Provider>
  );
};
