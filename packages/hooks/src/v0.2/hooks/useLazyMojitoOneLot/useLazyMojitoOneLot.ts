export function useLazyMojitoOneLot() {
  return true;
}

// legacy function
/*

export function useLazyMojitoOneLot(variables: { marketplaceAuctionLotId: string | undefined }): [
  () => void,
  {
    mojitoItemDetails?: IMojitoCollectionItemAuctionLot;
  } & ReturnType<typeof useMojito>,
] {
  const [getData, result] = useLazyMojito({
    query: EMojitoQueries.oneLot,
    options: {
      enabled: false,
    },
    variables,
  });

  return [
    getData,
    {
      mojitoItemDetails:
        (
          result?.data as {
            getMarketplaceAuctionLot: IMojitoCollectionItemAuctionLot;
          }
        )?.getMarketplaceAuctionLot ?? undefined,
      ...result,
    },
  ];
}


*/
