export function useFavorites() {
  return true;
}

// legacy function
/*

export function useFavorites(): {
  favorites:
    | (
        | IMojitoCollectionItem<IMojitoCollectionItemAuctionLot>
        | IMojitoCollectionItem<IMojitoCollectionItemBuyNowLot>
      )[]
    | null;
} & ReturnType<typeof useMojito> {
  const result = useMojito({
    query: EMojitoQueries.userFavorites,
    onlyAuthenticated: true,
  });

  return {
    favorites: result?.data?.me?.favoriteItems,
    ...result,
  };
}


*/
