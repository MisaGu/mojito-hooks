export function usePlaceBidMutation() {
  return true;
}

// legacy function
/*

export function usePlaceBidMutation<T = any, V = Variables>(
  lotData: IContentfulLotData,
): ReturnType<typeof useMojitoMutation> {
  const { bidsRefetch } = useCollectionItemBidsList(lotData.mojitoId as string);
  const { currentBids } = useCollectionItemCurrentBids(lotData.mojitoId as string);
  const [mutateFunction, mutateStatus] = useMojitoMutation<T, V>(EMojitoMutations.createBid);

  const mutateFunctionWithSegment = useCallback(
    (options: Parameters<typeof mutateFunction>[0]) => {
      return mutateFunction(options).then((result) => {
        const { lotId, mojitoId, slug } = lotData;
        if (result && currentBids.details.currentBid.isHold) bidsRefetch();

        return result;
      });
    },
    [mutateFunction, lotData, bidsRefetch, currentBids.details.currentBid.isHold],
  );

  // @ts-ignore
  return [mutateFunctionWithSegment, mutateStatus];
}

*/
