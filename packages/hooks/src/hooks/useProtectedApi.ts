import { useAuth0 } from '@auth0/auth0-react';
import { config } from '@constants';
import isBrowser from '@utils/isBrowser';
import {
  useCookieState,
  useCounter,
  useDebounceFn,
  useInterval,
  useIsomorphicLayoutEffect,
  usePrevious,
  useSetState,
} from 'ahooks';
interface IProtectedApiData {
  error: any;
  loading: boolean;
  data: { status: string };
}

export function useProtectedApi(
  url: string,
  options: { audience?: string; scope?: string } & Partial<RequestInit>,
): IProtectedApiData & { refresh: () => void; firstLoad: boolean } {
  const { getAccessTokenSilently } = useAuth0();
  const [refreshIndex, { inc: incRefreshIndex }] = useCounter(0);
  const [errorCounter, { inc: incErrorCounter }] = useCounter(0);
  const [auth0Cookie] = useCookieState(`auth0.${config.AUTH0_CLIENTID}.is.authenticated`);
  const [state, setState] = useSetState<IProtectedApiData>({
    error: null,
    loading: true,
    data: { status: '' },
  });
  const { run: refreshSyncRegistrationWidthDebounce } = useDebounceFn(() => incRefreshIndex(), {
    wait: 700,
  });
  const previousState = usePrevious(state);
  useInterval(() => incRefreshIndex(), 60000);

  useIsomorphicLayoutEffect(() => {
    (async () => {
      if (auth0Cookie) {
        const controller = new AbortController();
        const timeout =
          isBrowser &&
          (
            (navigator as any).connection ||
            (navigator as any).mozConnection ||
            (navigator as any).webkitConnection
          ).downlink;
        const timer = setTimeout(() => controller.abort(), Math.ceil((100 / timeout) * 500));

        try {
          const { audience, scope, ...fetchOptions } = options;
          const accessToken = await getAccessTokenSilently({ audience, scope });

          const res = await fetch(url, {
            ...fetchOptions,
            headers: {
              ...fetchOptions.headers,
              Authorization: `${accessToken}`,
            },
            signal: controller.signal,
          });
          clearTimeout(timer);
          setState({
            data: await res.json(),
            error: false,
            loading: false,
          });
        } catch (error: any) {
          clearTimeout(timer);
          if (error.error == 'consent_required') return;
          if (errorCounter < 3) {
            incErrorCounter();
            setTimeout(() => refreshSyncRegistrationWidthDebounce(), 300 * errorCounter);

            setState({
              error,
              loading: false,
            });
          } else {
            setState({
              data: { status: '' },
              error: false,
              loading: false,
            });
          }
        }
      }
    })();
  }, [refreshIndex]);

  return {
    firstLoad: previousState?.data?.status == '' && state.data.status != '',
    ...state,
    refresh: () => incRefreshIndex(),
  };
}
