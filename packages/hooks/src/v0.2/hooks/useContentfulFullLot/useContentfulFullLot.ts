import { IContentfulLotsQuery, IContentfulLotData } from '../../domain/interfaces';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
import { useContentfulFactory } from '../useContentfulFactory/useContentfulFactory';
import { EContentfulQueries } from '../../domain/gql/contentful';

// function transformFn(lotsQuery?: IContentfulLotsQuery) {
function transformFn(lotsMap?: Record<string, IContentfulLotData>) {
  if (!lotsMap) return undefined;

  // TODO: Match by ID instead:
  // TODO: This should return a single item, not an object that is always going to have a single item.
  return Object.values(lotsMap)[0];

  /*
  const lots = lotsQuery.lotCollection?.items || [];

  return lots
    ? lots.reduce((lotsAcc, lot) => {
        lotsAcc[lot.lotId] = lot;

        return lotsAcc;
      }, {} as Record<string, IContentfulLotData>)
    : {};
  */
}

export type UseContentfulFullLotData = ReturnType<typeof transformFn>;

export type UseContentfulFullLotReturn = ReturnType<typeof useContentfulFullLot>;

export interface UseContentfulFullLotProps extends BaseQueryHookProps<UseContentfulFullLotData> {
  mojitoID: string;
}

export function useContentfulFullLot({ mojitoID, options }: UseContentfulFullLotProps) {
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
