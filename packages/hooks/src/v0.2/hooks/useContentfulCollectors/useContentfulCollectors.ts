import {
  IContentfulAuthor,
  IContentfulCollectorsQuery,
  IContentfulCollector,
} from '../../domain/interfaces';
import { QueryResult } from '../../domain/utils/gql.utils';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
import { useContentfulFactory } from '../useContentfulFactory/useContentfulFactory';
import { EContentfulQueries } from '../../domain/gql/contentful';

export type UseContentfulCollectorsData = undefined | null | IContentfulCollector[];

export type UseContentfulCollectorsReturn = QueryResult<'collectors', UseContentfulCollectorsData>;

export type UseContentfulCollectorsProps = BaseQueryHookProps<IContentfulCollectorsQuery>;

// TODO: Memo this function:

function transformFn(
  collectorsQuery?: undefined | null | IContentfulCollectorsQuery,
): UseContentfulCollectorsData {
  if (!collectorsQuery) return undefined;

  return collectorsQuery.collectorCollection?.items || [];
}

export function useContentfulCollectors({
  options,
}: UseContentfulCollectorsProps = {}): UseContentfulCollectorsReturn {
  return useContentfulFactory<
    'collectors',
    IContentfulCollectorsQuery,
    UseContentfulCollectorsData
  >({
    as: 'collectors',
    query: EContentfulQueries.collectors,
    options,
    transformFn,
  });
}

// legacy function
/*

export function useContentfulCollectors(): {
  collectors: IContentfulCollector[];
  collectorsError: any;
  collectorsLoading: boolean;
} {
  const { data, error, loading } = useContentful<IContentfulCollectorsQuery>(
    EContentfulQueries.collectors,
  );
  if (error) console.error(error);

  return {
    collectors: data?.collectorCollection?.items ?? [],
    collectorsError: error,
    collectorsLoading: loading,
  };
}


*/
