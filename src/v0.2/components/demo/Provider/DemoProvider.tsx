import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import { config } from '../../../domain/constants/general.constants';
import { AuthProvider } from '../../../domain/context/auth.context';
import { mojitoGqlClient } from '../../../domain/utils/gqlRequest.util';

export const DemoProviders = ({ children }) => {
  /*
  useEffect(() => {
    console.log({
      TEST_ENV: config.TEST_ENV,
      AUTH0_DOMAIN: config.AUTH0_DOMAIN,
      AUTH0_CLIENTID: config.AUTH0_CLIENTID,
      AUTH_REDIRECT_URI: config.AUTH_REDIRECT_URI,
    });
  }, []);
  */

  return (
    // <Auth0Provider
    //   domain={'https://accounts.staging.sothelabs.com'}
    //   clientId={'thTFyyXuq94Zr6nBIfEVnQ5iUwRlJsSg'}
    //   redirectUri={'http://localhost:3000'}
    // >
    <AuthProvider>{children}</AuthProvider>
    // </Auth0Provider>
  );
};
