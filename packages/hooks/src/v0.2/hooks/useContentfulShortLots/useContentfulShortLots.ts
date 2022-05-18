export function useContentfulShortLots() {
  return true;
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
