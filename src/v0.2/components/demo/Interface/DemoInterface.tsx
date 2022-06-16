import { useAuth0 } from '@auth0/auth0-react';
import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { EAuthActionTypes, useAuthContext } from '../../../domain/context/auth.context';
import { MojitoHooksProvider } from '../../../domain/context/mojito.context';

interface DemoInterfaceProps {
  demoComponent: React.ComponentType;
}

export const DemoInterface: React.FC<DemoInterfaceProps> = ({ demoComponent: DemoComponent }) => {
  const { dispatch, isAuthenticated } = useAuthContext();
  // const { getIdTokenClaims, isAuthenticated, isLoading, loginWithPopup } = useAuth0();

  useEffect(() => {
    dispatch({
      type: EAuthActionTypes.addToken,
      token:
        'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik16TXdPVVk1UTBRME9EQTFOekV4T0RFMFFUZEZORFUwUmpsQk5EbENSVVV3TlVRNFJrWTRPUSJ9.eyJodHRwOi8vc2NoZW1hcy5zb3RoZWJ5cy1zdGFnaW5nLmNvbS9hcHBNZXRhZGF0YSI6eyJhIjowLCJjb25zZW50Ijp7ImNvbnNlbnRPblNpZ251cCI6dHJ1ZSwibGF0ZXN0Q29uc2VudCI6IjIwMjAtMDEtMTNUMjA6NDA6NTErMDA6MDAifSwiY3VzdG9tZXJEYXRhIjp7InBhcnR5SWQiOjg3Njc2ODA2NCwicHJlZmVycmVkIjpmYWxzZX0sInVzZXJUeXBlIjoidHJhbnNhY3Rpb25hbCIsIndlYlVzZXJJZCI6NDI5NTk4MH0sImh0dHA6Ly9zY2hlbWFzLnNvdGhlYnlzLXN0YWdpbmcuY29tL3VzZXJNZXRhZGF0YSI6eyJmaXJzdE5hbWUiOiJIYXJsZXkiLCJsYXN0TmFtZSI6IlF1aW5uIiwibmFtZSI6IkhhcmxleSBRdWlubiIsIm5ld1VzZXIiOmZhbHNlLCJub0VtYWlscyI6ZmFsc2UsIm9wdGVkT3V0IjpmYWxzZSwicHJlZmVyZW5jZXMiOnsiZm9udFNpemUiOjEyfSwidGVzdERhdGEiOiJkZW1vYmlkZGVyMUBzb3RoZWJ5c3FhLmNvbSIsInRpdGxlIjoiTWlzcyJ9LCJnaXZlbl9uYW1lIjoiRGVtaSIsImZhbWlseV9uYW1lIjoiTW9vcmUiLCJuaWNrbmFtZSI6ImRlbW9iaWRkZXIxIiwibmFtZSI6IkhhcmxleSBRdWlubiIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci82MWVjMmU1NDMwMWJmZTUzYTFhMDMyMTBkYmU0OGY0YT9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRmRtLnBuZyIsInVwZGF0ZWRfYXQiOiIyMDIyLTA2LTE0VDE1OjAzOjU5LjU1MFoiLCJlbWFpbCI6ImRlbW9iaWRkZXIxQHNvdGhlYnlzcWEuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOi8vYWNjb3VudHMuc3RhZ2luZy5zb3RoZWxhYnMuY29tLyIsInN1YiI6ImF1dGgwfDVlMWNkNWQzNjdlZDk5MGU4OGY2NDdmMyIsImF1ZCI6InRoVEZ5eVh1cTk0WnI2bkJJZkVWblE1aVV3UmxKc1NnIiwiaWF0IjoxNjU1MjE5NDg1LCJleHAiOjE2NTUyNTU0ODUsIm5vbmNlIjoiVGt0RVMyaGZVbWRIUTIxRlpHb3dmazV5U0dJdGJUbGFiVGhFZW1ocFMweHplalpwUzJ0VlkyOU5kQT09In0.XYoenGD5CZ9q2cNBd-E8clgPFkUHV8D1v2Tx4wBn-YL3FXtcbNQUwesM98wxJl2ucaJaDT_bN-x1gAe9G1d0JXOEgqmGS_QnuDSCdJr5lnsq6cSKy7KgaO9opOjn93LmsNFkdzrZEsoXFBGPllTDGxF8oMrPXWMIH3oa79ea4kRMII1LQzO8t1Prrb5yCbSXOQzvgLTg0GJVcEzMXQ00KRBXhq43vTZsmciMNRWyq3N3pIOH_lJIxqyxOcAAVp56kKW4eqjH3Nd6C-CaO9t9Ah7ZCfno0FmgyC4fVD3YqJwCecq-B2oUlBEQcwdC0Soc2WSe8lqHUeqIE41Jdiua-Q',
    });
  }, []);

  // const getAuthenticationToken = useCallback(async () => {
  //   const nextRawToken = await getIdTokenClaims();

  //   // eslint-disable-next-line no-underscore-dangle
  //   return nextRawToken?.__raw || '';
  // }, [getIdTokenClaims]);

  // useEffect(() => {
  //   if (isLoading) return;

  //   async function initAuthentication() {
  //     const nextToken = await getAuthenticationToken();

  //     // console.log(`${nextToken ? '🔒 Adding' : '🔓 Removing'} authentication token...`);

  //     dispatch(
  //       nextToken
  //         ? {
  //             type: EAuthActionTypes.addToken,
  //             token: nextToken,
  //           }
  //         : {
  //             type: EAuthActionTypes.clearToken,
  //           },
  //     );
  //   }

  //   initAuthentication();
  // }, [isLoading, isAuthenticated]);

  // IMPORTANT: Authentication (loginWithPopup) will only work in port 3000!

  return isAuthenticated ? (
    <MojitoHooksProvider>
      <DemoComponent />
    </MojitoHooksProvider>
  ) : (
    <div>
      {/* <p>{isLoading ? 'Authenticating...' : 'Sorry, you need to log in first.'} </p>
      <p>
        <button onClick={loginWithPopup} disabled={isLoading}>
          Log In
        </button>
      </p> */}
    </div>
  );
};
