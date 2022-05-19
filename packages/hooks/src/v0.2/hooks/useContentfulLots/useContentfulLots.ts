export function useContentfulLots() {
  return true;
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
