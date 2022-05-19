import {
  IContentfulAuthor,
  IContentfulLotsQuery,
  IContentfulCollector,
  IContentfulLotData,
} from '../../domain/interfaces';
import { QueryResult } from '../../domain/utils/gql.utils';
import { BaseHookProps } from '../../domain/interfaces/hooks.interface';
import { useContentfulFactory } from '../useContentfulFactory/useContentfulFactory';
import { EContentfulQueries } from '../../domain/gql/contentful';

export type UseContentfulLotsData = undefined | null | Record<string, IContentfulLotData>;

export type UseContentfulLotsReturn = QueryResult<'lots', UseContentfulLotsData>;

export interface UseContentfulLotsProps extends BaseHookProps<IContentfulLotsQuery> {
  mojitoID: string | string[];
}

// TODO: Memo this function:

function transformFn(lotsQuery?: undefined | null | IContentfulLotsQuery): UseContentfulLotsData {
  if (!lotsQuery) return undefined;

  const lots = lotsQuery.lotCollection?.items || [];

  return lots
    ? lots.reduce((lotsAcc, lot) => {
        lotsAcc[lot.lotId] = lot;

        return lotsAcc;
      }, {} as Record<string, IContentfulLotData>)
    : {};
}

export function useContentfulLots({
  mojitoID,
  options,
}: UseContentfulLotsProps): UseContentfulLotsReturn {
  return useContentfulFactory<'lots', IContentfulLotsQuery, UseContentfulLotsData>({
    as: 'lots',
    query: EContentfulQueries.fullLot,
    variables: {
      mojitoIds: Array.isArray(mojitoID) ? mojitoID : [mojitoID],
    },
    options,
    transformFn,
  });
}

// legacy function
/*

export function useContentfulLots(mojitoIds?: string[]): {
  lots: { [k: string]: IContentfulLotData };
  lotsError: any;
  lotsLoading: boolean;
} {
  const { data, error, loading } = useContentfulFactory(EContentfulQueries.shortLots, mojitoIds);
  if (error) console.error(error);

  return {
    lots: data ?? {},
    lotsError: error,
    lotsLoading: loading,
  };
}

*/
