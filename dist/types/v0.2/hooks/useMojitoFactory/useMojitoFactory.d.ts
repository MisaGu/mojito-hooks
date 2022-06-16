import { Variables } from 'graphql-request/dist/types';
import { UseQueryOptions } from 'react-query';
import { EMojitoKey } from '../../domain/enums/state.enum';
export interface MojitoFactoryOptions<
  TDataPropertyName extends string,
  TSelectorData = any,
  TResponse = TSelectorData,
  TError = Error,
> {
  as: TDataPropertyName;
  query: EMojitoKey;
  variables?: Variables;
  options?: UseQueryOptions<TResponse, TError>;
  preloadFn?: () => Promise<void>;
  selectorFn?: (response: TResponse) => TSelectorData;
  force?: boolean;
  onlyAuthenticated?: boolean;
}
export declare function useMojitoFactory<
  TDataPropertyName extends string,
  TSelectorData = any,
  TResponse = TSelectorData,
  TError = Error,
>({
  as,
  query,
  variables,
  options,
  preloadFn,
  selectorFn,
  force,
  onlyAuthenticated,
}: MojitoFactoryOptions<
  TDataPropertyName,
  TSelectorData,
  TResponse,
  TError
>): import('../../domain/utils/gqlResult.utils').QueryResult<TDataPropertyName, TResponse, Error>;
