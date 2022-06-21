import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { MojitoHooksProvider } from '../../../index';

interface DemoInterfaceProps {
  demoComponent: React.ComponentType;
}

const Authorize = ({ demoComponent: DemoComponent }) => {
  const { getIdTokenClaims, isAuthenticated, isLoading, loginWithPopup } = useAuth0();
  const [token, setToken] = useState(
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik16TXdPVVk1UTBRME9EQTFOekV4T0RFMFFUZEZORFUwUmpsQk5EbENSVVV3TlVRNFJrWTRPUSJ9.eyJodHRwOi8vc2NoZW1hcy5zb3RoZWJ5cy1zdGFnaW5nLmNvbS9hcHBNZXRhZGF0YSI6eyJhIjowLCJjb25zZW50Ijp7ImNvbnNlbnRPblNpZ251cCI6dHJ1ZSwibGF0ZXN0Q29uc2VudCI6IjIwMjAtMDEtMTNUMjA6NDU6MzMrMDA6MDAifSwiY3VzdG9tZXJEYXRhIjp7InBhcnR5SWQiOjg3Njc2ODIwNywicHJlZmVycmVkIjpmYWxzZX0sIndlYlVzZXJJZCI6NDI5NTk4Mn0sImh0dHA6Ly9zY2hlbWFzLnNvdGhlYnlzLXN0YWdpbmcuY29tL3VzZXJNZXRhZGF0YSI6eyJlbWFpbCI6ImRlbW9iaWRkZXIzQHNvdGhlYnlzcWEuY29tIiwiZmlyc3ROYW1lIjoiQ2xhcmsiLCJsYXN0TmFtZSI6IktlbnQiLCJuYW1lIjoiQ2xhcmsgS2VudCIsIm5ld1VzZXIiOmZhbHNlLCJub0VtYWlscyI6ZmFsc2UsIm9wdGVkT3V0IjpmYWxzZSwidGl0bGUiOiJNciJ9LCJnaXZlbl9uYW1lIjoiQ2xhcmsiLCJmYW1pbHlfbmFtZSI6IktlbnQiLCJuaWNrbmFtZSI6ImRlbW9iaWRkZXIzIiwibmFtZSI6IkNsYXJrIEtlbnQiLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvODdiNDgyZTA4OTI4NzNkMDc4NzM3ZTMwY2RlYmRkZTY_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZjay5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyMi0wNi0yMFQxNToxNzozMC42NjRaIiwiZW1haWwiOiJkZW1vYmlkZGVyM0Bzb3RoZWJ5c3FhLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2FjY291bnRzLnN0YWdpbmcuc290aGVsYWJzLmNvbS8iLCJzdWIiOiJhdXRoMHw1ZTFjZDZlZTQ2ZDQ0MDBmMGJjNmUzODciLCJhdWQiOiJ0aFRGeXlYdXE5NFpyNm5CSWZFVm5RNWlVd1JsSnNTZyIsImlhdCI6MTY1NTczODMwNywiZXhwIjoxNjU1Nzc0MzA3LCJub25jZSI6IllXOTBWa1JRVG05R1IyMDRUV2h3WWw5TFNrTXhXalp6VjBwU1lrOXRNeTE1Y0dsRlgyMXhSR2xoV0E9PSJ9.YxH7SuQ7WlWe4lY36uUWpO-IP5FR7Um8NLldmUmlluvAKKhjRzFknmrsg0ktcUUI9-lam3KcJyrMV2b3yxMWEC2J43zjgT3gpHgRyjcEeuTY2UtRZxp4_fo-mvEpjBXsgBP6t4Na5PcdfbLte7Fqs0o5J42p4o9aZFwwAApFVHWcYob95ByhQYo_uUI3Xh7prkZMF3ISsX4CrvFTZbDTERhjgyxrfuS_VC4xckOtPDVRQ4Bn5wxmx1sj1qkUpcNBfBA5s_BmebME5AsVjcyOpXo-aQbDcTuOjA5a6BXMwUwIG6icD9mSQV6QwhIJvTX0_csqmmiczW5EV5iQ7RF85g',
  );

  useEffect(() => {
    if (isLoading || isAuthenticated || token) return;

    if (!isAuthenticated) loginWithPopup();
  }, []);

  useEffect(() => {
    if (isLoading || token) return;

    (async () => {
      const nextRawToken = await getIdTokenClaims();
      // eslint-disable-next-line no-underscore-dangle
      setToken(nextRawToken?.__raw || '');
    })();
  }, [isLoading, isAuthenticated]);

  return true ? (
    <MojitoHooksProvider
      // authorization={{
      //   authorization: `Bearer ${token}`,
      // }}
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
