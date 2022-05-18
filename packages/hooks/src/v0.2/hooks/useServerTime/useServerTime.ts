export function useServerTime() {
  return true;
}

// legacy function
/*

export function useServerTime(): {
  serverTime: Date;
} & ReturnType<typeof useMojito> {
  const result = useMojito({
    query: EMojitoQueries.serverTime,
  });

  return {
    serverTime: result?.data?.serverTime,
    ...result,
  };
}


*/
