import { IContentfulCollectorsQuery } from '../../domain/interfaces';
import { BaseHookProps } from '../../domain/interfaces/hooks.interface';
import { useContentfulFactory } from '../useContentfulFactory/useContentfulFactory';
import { EContentfulQueries } from '../../domain/gql/contentful';

function transformFn(collectorsQuery?: IContentfulCollectorsQuery) {
  if (!collectorsQuery) return undefined;

  return collectorsQuery.collectorCollection?.items || [];
}

export type UseContentfulCollectorsData = ReturnType<typeof transformFn>;

export type UseContentfulCollectorsReturn = ReturnType<typeof useContentfulCollectors>;

export type UseContentfulCollectorsProps = BaseHookProps<UseContentfulCollectorsData>;

export function useContentfulCollectors({ options }: UseContentfulCollectorsProps = {}) {
  return useContentfulFactory({
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
