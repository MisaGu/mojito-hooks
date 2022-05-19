import { Variables } from 'graphql-request';
import { UseMutationOptions, UseQueryOptions } from 'react-query';

export interface BaseQueryHookProps<TData = any, TError = Error> {
  options?: UseQueryOptions<TData, TError>;
}

export interface BaseMutationHookProps<TData = any, TError = Error, TVariables = Variables> {
  options?: UseMutationOptions<TData, TError, TVariables>;
}

export interface BaseHookPropsWithUrlAndSlug<TData = any, TError = Error>
  extends BaseQueryHookProps<TData, TError> {
  url?: string;
  slug?: string;
}

export interface BaseHookPropsWithForce<TData = any, TError = Error>
  extends BaseQueryHookProps<TData, TError> {
  force?: boolean;
}
