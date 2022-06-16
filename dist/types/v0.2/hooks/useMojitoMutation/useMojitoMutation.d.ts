import { Variables } from 'graphql-request';
import { UseMutationOptions } from 'react-query';
import { EMojitoKey } from '../../domain/enums/state.enum';
export interface IUseMojitoFactoryOptions<
  TDataPropertyName extends string,
  TData = any,
  TReturn = TData,
  TError = Error,
  TVariables = Variables,
  TContext = unknown,
> {
  as: TDataPropertyName;
  query: EMojitoKey;
  variables: TVariables;
  options?: UseMutationOptions<TReturn, TError, TVariables, TContext>;
  selectorFn?: (data: TData | undefined) => TReturn;
  onlyAuthenticated?: boolean;
  auto?: boolean;
}
export declare function useMojitoMutation<
  TDataPropertyName extends string,
  TData = any,
  TReturn = TData,
  TError = Error,
  TVariables = Variables,
  TContext = unknown,
>({
  as,
  query,
  variables,
  options,
  selectorFn,
  onlyAuthenticated,
  auto,
}: IUseMojitoFactoryOptions<TDataPropertyName, TData, TReturn, TError, TVariables, TContext>): {
  isLoading: boolean;
  error: TError | null;
  mutate: import('react-query').UseMutateFunction<TReturn, TError, unknown, unknown>;
  mutateAsync: import('react-query').UseMutateAsyncFunction<TReturn, TError, unknown, unknown>;
  mutationResult: Omit<
    import('react-query').UseMutationResult<TReturn, TError, unknown, unknown>,
    'data' | 'error' | 'isLoading' | 'mutate' | 'mutateAsync'
  >;
} & { [P in TDataPropertyName]: TReturn | undefined } & {
  mutate: (variablesProp: TVariables, context: TContext) => void;
  mutateAsync: (variablesProp: TVariables, context: TContext) => Promise<TReturn>;
};
