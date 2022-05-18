import { UseQueryOptions } from 'react-query';

export interface BaseHookProps<TData = any, TError = Error> {
  options?: UseQueryOptions<TData, TError>;
}

export interface BaseHookPropsWithUrlAndSlug<TData = any, TError = Error>
  extends BaseHookProps<TData, TError> {
  url?: string;
  slug?: string;
}
