export function useContentfulCollectors() {
  return true;
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
