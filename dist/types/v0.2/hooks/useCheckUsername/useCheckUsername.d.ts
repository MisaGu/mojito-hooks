import { OrgUsernameAvailableResponse } from '../../domain/interfaces';
import { BaseLazyQueryHookProps } from '../../domain/interfaces/hooks.interface';
declare function selectorFn(response?: OrgUsernameAvailableResponse): boolean | undefined;
export declare type UseCheckUsername = ReturnType<typeof selectorFn>;
export declare type UseCheckUsernameReturn = ReturnType<typeof useCheckUsername>;
export interface UseCheckUsernameProps extends BaseLazyQueryHookProps<UseCheckUsername> {
  username: string;
}
export declare function useCheckUsername({ username, options }: UseCheckUsernameProps): {
  checkUsername: <TPageData>(
    options?:
      | (import('react-query').RefetchOptions &
          import('react-query').RefetchQueryFilters<TPageData>)
      | undefined,
  ) => Promise<import('react-query').QueryObserverResult<any, Error>>;
  isLoading: boolean;
  error: Error | null;
  queryResult: Omit<
    import('react-query').UseQueryResult<any, Error>,
    'data' | 'error' | 'refetch' | 'isLoading'
  >;
};
export default useCheckUsername;
