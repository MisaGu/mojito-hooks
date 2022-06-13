import { Variables } from 'graphql-request';
import { UseMutationOptions, UseQueryOptions } from 'react-query';

export interface BaseQueryHookProps<TData = any, TError = Error, TResult = any> {
  options?: UseQueryOptions<TResult, TError, TData>;
}

export interface BaseLazyQueryHookProps<TData = any, TError = Error, TResult = any> {
  options?: Omit<UseQueryOptions<TResult, TError, TData>, 'enabled'> & { enabled: false };
}

export interface BaseQueryHookPropsWithUrlAndSlug<TData = any, TError = Error, TResult = any>
  extends BaseQueryHookProps<TResult, TError, TData> {
  pathname?: string;
  slug?: string;
}

export interface BaseQueryHookPropsWithForce<TData = any, TError = Error, TResult = any>
  extends BaseQueryHookProps<TResult, TError, TData> {
  force?: boolean;
}

export interface BaseMutationHookProps<TData = any, TError = Error, TVariables = Variables> {
  options?: UseMutationOptions<TData, TError, TVariables>;
}
