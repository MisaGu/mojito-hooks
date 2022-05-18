export function useActiveBids() {
  return true;
}

// legacy function
/*
  export function useActiveBids(): {
    activeBids: IMojitoCollectionItemDetailsBid[] | null;
  } & ReturnType<typeof useMojito> {
    const result = useMojito({
      query: EMojitoQueries.userActiveBids,
      variables: {
        organizationID: config.ORGANIZATION_ID,
      },
      onlyAuthenticated: true,
    });

    return {
      activeBids: result?.data?.me?.activeBids,
      ...result,
    };
  }

*/
