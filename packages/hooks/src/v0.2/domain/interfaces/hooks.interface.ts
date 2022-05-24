import { Variables } from 'graphql-request';
import { UseMutationOptions, UseQueryOptions } from 'react-query';

export interface BaseQueryHookProps<TData = any, TError = Error> {
  options?: UseQueryOptions<TData, TError>;
}

export interface BaseMutationHookProps<TData = any, TError = Error, TVariables = Variables> {
  options?: UseMutationOptions<TData, TError, TVariables>;
}

export interface BaseQueryHookPropsWithUrlAndSlug<TData = any, TError = Error>
  extends BaseQueryHookProps<TData, TError> {
  pathname?: string;
  slug?: string;
}

export interface BaseQueryHookPropsWithForce<TData = any, TError = Error>
  extends BaseQueryHookProps<TData, TError> {
  force?: boolean;
}
