import { ICollectionItemByIdRemainingCountRequest } from '../../domain/interfaces';

export function resolveGetCollectionItemByIdRemainingCount(req, res, ctx) {
  return res(
    ctx.data({
      collectionItemById: {
        id: 'mock-item-id',
        details: {
          id: 'mock-item-id',
          remainingCount: 100,
        },
      },
    } as ICollectionItemByIdRemainingCountRequest),
  );
}
