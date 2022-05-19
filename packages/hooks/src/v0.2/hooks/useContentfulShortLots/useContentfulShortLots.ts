import { IContentfulLotsQuery } from '../../domain/interfaces';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
import { useContentfulFactory } from '../useContentfulFactory/useContentfulFactory';
import { EContentfulQueries } from '../../domain/gql/contentful';

function transformFn(lotsQuery?: IContentfulLotsQuery) {
  if (!lotsQuery) return undefined;

  return lotsQuery.lotCollection?.items || [];
}

export type UseContentfulShortLotsData = ReturnType<typeof transformFn>;

export type UseContentfulShortLotsReturn = ReturnType<typeof useContentfulShortLots>;

export interface UseContentfulShortLotsProps
  extends BaseQueryHookProps<UseContentfulShortLotsData> {
  mojitoID: string | string[];
}

export function useContentfulShortLots({ mojitoID, options }: UseContentfulShortLotsProps) {
  return useContentfulFactory({
    as: 'shortLots',
    query: EContentfulQueries.shortLots,
    variables: {
      mojitoIds: Array.isArray(mojitoID) ? mojitoID : [mojitoID],
    },
    options,
    transformFn,
  });
}

// legacy function
/*
export function useContentfulShortLots(mojitoID: string | string[]): {
  lots: IContentfulLotData[];
  lotError: any;
  lotLoading: boolean;
} {
  const { data, error, loading } = useContentful<any>(EContentfulQueries.shortLots, {
    mojitoIds: Array.isArray(mojitoID) ? mojitoID : [mojitoID],
  });
  if (error) console.error(error);
  return {
    lots: data ?? [],
    lotError: error,
    lotLoading: loading,
  };
}
*/
