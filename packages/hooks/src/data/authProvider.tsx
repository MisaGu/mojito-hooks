import { Auth0Provider } from '@auth0/auth0-react';
import { config } from '@constants';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

export interface IAuth0State {
  returnTo?: string;
  query?: { [key: string]: string };
}

export const AuthProvider = ({ children }: { children: ReactNode | ReactNode[] }): JSX.Element => {
  const router = useRouter();

  const onRedirectCallback = (appState?: IAuth0State) => {
    router.replace({
      pathname: appState?.returnTo || router.query.returnTo?.toString() || window.location.pathname,
      query: { ...appState?.query },
    });
  };
  return (
    <Auth0Provider
      domain={config.AUTH0_DOMAIN!}
      clientId={config.AUTH0_CLIENTID!}
      redirectUri={config.AUTH0_REDIRECT_URI}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
