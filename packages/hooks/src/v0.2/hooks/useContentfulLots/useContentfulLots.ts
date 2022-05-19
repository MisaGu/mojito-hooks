import { IContentfulLotsQuery, IContentfulLotData } from '../../domain/interfaces';
import { BaseHookProps } from '../../domain/interfaces/hooks.interface';
import { useContentfulFactory } from '../useContentfulFactory/useContentfulFactory';
import { EContentfulQueries } from '../../domain/gql/contentful';

function transformFn(lotsQuery?: IContentfulLotsQuery) {
  if (!lotsQuery) return undefined;

  const lots = lotsQuery.lotCollection?.items || [];

  return lots
    ? lots.reduce((lotsAcc, lot) => {
        lotsAcc[lot.lotId] = lot;

        return lotsAcc;
      }, {} as Record<string, IContentfulLotData>)
    : {};
}

export type UseContentfulLotsData = ReturnType<typeof transformFn>;

export type UseContentfulLotsReturn = ReturnType<typeof useContentfulLots>;

export interface UseContentfulLotsProps extends BaseHookProps<UseContentfulLotsData> {
  mojitoID: string;
}

export function useContentfulLots({ mojitoID, options }: UseContentfulLotsProps) {
  return useContentfulFactory({
    as: 'lots',
    query: EContentfulQueries.fullLot,
    variables: {
      mojitoId: mojitoID,
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
