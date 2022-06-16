import { EMojitoKey } from '../../domain/enums/state.enum';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function selectorFn(response) {
  if (!response) return undefined;
  return response.collectionItemById.details.bids;
}

export function useCollectionItemBidsList(_a) {
  var collectionItemID = _a.collectionItemID,
    options = _a.options;
  return useMojitoFactory({
    as: 'bids',
    query: EMojitoKey.collectionItemByIdBidsList,
    variables: {
      id: collectionItemID,
    },
    options: options,
    selectorFn: selectorFn,
  });
}
export default useCollectionItemBidsList;
