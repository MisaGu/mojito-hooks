import { CollectionItemBidsListResponse } from '../../domain/interfaces';

export function resolveGetCollectionItemByIdBidsList(req, res, ctx) {
  return res(
    ctx.data({
      collectionItemById: {
        id: 'mock-item-id',
        details: {
          id: 'mock-item-id',
          endDate: '',
          startDate: '',
          bids: [],
        },
      },
    } as CollectionItemBidsListResponse),
  );
}
