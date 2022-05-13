import { useAuth0 } from '@auth0/auth0-react';
import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { EAuthContextActionTypes, useAuthContext } from '../../../domain/context/auth.context';

interface DemoInterfaceProps {
  demoComponent: React.ComponentType;
}

export const DemoInterface: React.FC<DemoInterfaceProps> = ({ demoComponent: DemoComponent }) => {
  const {
    state: { token },
    dispatch,
  } = useAuthContext();
  const { getIdTokenClaims, isAuthenticated, isLoading, loginWithPopup } = useAuth0();

  const getAuthenticationToken = useCallback(async () => {
    const token = await getIdTokenClaims();

    // eslint-disable-next-line no-underscore-dangle
    return token?.__raw || '';
  }, [getIdTokenClaims]);

  useEffect(() => {
    if (isLoading) return;

    async function initAuthentication() {
      const token = await getAuthenticationToken();

      dispatch({
        type: EAuthContextActionTypes.addIdToken,
        token,
      });
    }

    initAuthentication();
  }, [isLoading, isAuthenticated]);

  // TODO: This might only work in port 3000!

  return isAuthenticated && token ? (
    <DemoComponent />
  ) : (
    <div>
      <p>{isLoading ? 'Authenticating...' : 'Sorry, you need to log in first.'} </p>
      <p>
        <button onClick={loginWithPopup} disabled={isLoading}>
          Log In
        </button>
      </p>
      <pre>{JSON.stringify({ isAuthenticated, isLoading, token }, null, '')}</pre>
    </div>
  );
};
