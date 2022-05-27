import { useAuth0 } from '@auth0/auth0-react';
import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { EAuthActionTypes, useAuthContext } from '../../../domain/context/auth.context';
import { MojitoHooksProvider } from '../../../domain/context/mojito.context';
import { log } from '../../../domain/utils/log.utils';

interface DemoInterfaceProps {
  demoComponent: React.ComponentType;
}

export const DemoInterface: React.FC<DemoInterfaceProps> = ({ demoComponent: DemoComponent }) => {
  const { dispatch } = useAuthContext();
  const { getIdTokenClaims, isAuthenticated, isLoading, loginWithPopup } = useAuth0();

  const getAuthenticationToken = useCallback(async () => {
    const nextRawToken = await getIdTokenClaims();

    // eslint-disable-next-line no-underscore-dangle
    return nextRawToken?.__raw || '';
  }, [getIdTokenClaims]);

  useEffect(() => {
    if (isLoading) return;

    async function initAuthentication() {
      const nextToken = await getAuthenticationToken();

      log(`${nextToken ? '🔒 Adding' : '🔓 Removing'} authentication token...`);

      dispatch(
        nextToken
          ? {
              type: EAuthActionTypes.addToken,
              token: nextToken,
            }
          : {
              type: EAuthActionTypes.clearToken,
            },
      );
    }

    initAuthentication();
  }, [isLoading, isAuthenticated]);

  // IMPORTANT: Authentication (loginWithPopup) will only work in port 3000!

  return isAuthenticated ? (
    <MojitoHooksProvider>
      <DemoComponent />
    </MojitoHooksProvider>
  ) : (
    <div>
      <p>{isLoading ? 'Authenticating...' : 'Sorry, you need to log in first.'} </p>
      <p>
        <button onClick={loginWithPopup} disabled={isLoading}>
          Log In
        </button>
      </p>
    </div>
  );
};
