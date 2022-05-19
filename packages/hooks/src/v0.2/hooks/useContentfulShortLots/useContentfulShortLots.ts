import { IContentfulLotData, IContentfulLotsQuery } from '../../domain/interfaces';
import { QueryResult } from '../../domain/utils/gql.utils';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
import { useContentfulFactory } from '../useContentfulFactory/useContentfulFactory';
import { EContentfulQueries } from '../../domain/gql/contentful';

export type UseContentfulShortLotsData = undefined | null | IContentfulLotData[];

export type UseContentfulShortLotsReturn = QueryResult<'shortLots', UseContentfulShortLotsData>;

export interface UseContentfulShortLotsProps extends BaseQueryHookProps<IContentfulLotsQuery> {
  mojitoID: string | string[];
}

// TODO: Memo this function:

function transformFn(
  lotsQuery?: undefined | null | IContentfulLotsQuery,
): UseContentfulShortLotsData {
  if (!lotsQuery) return undefined;

  return lotsQuery.lotCollection?.items || [];
}

export function useContentfulShortLots({
  mojitoID,
  options,
}: UseContentfulShortLotsProps): UseContentfulShortLotsReturn {
  return useContentfulFactory<'shortLots', IContentfulLotsQuery, UseContentfulShortLotsData>({
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
