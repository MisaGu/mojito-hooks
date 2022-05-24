// import { IIMojitoCollectionItemCurrentBidsRequest } from '../../domain/interfaces';

export function resolveGetCollectionBySlugCurrentBids(req, res, ctx) {
  return res(
    ctx.data(
      {
        collectionBySlug: {
          id: 'mock-collection-id',
          items: [
            {
              id: 'mock-item-id',
              details: {
                id: 'a4479453-b457-4f6b-ae06-3e4016db77f8',
                endDate: '2022-03-14T11:10:13Z',
                startDate: '2022-03-10T06:30:13Z',
                startingBid: 50,
                currentBid: {
                  id: 'e55e9850-959c-404c-bcce-51270ed59da0',
                  amount: 1500,
                  createdAt: '2022-03-11T15:29:13Z',
                  maximumBid: 1500,
                  nextBidIncrement: 1600,
                  marketplaceAuctionLotId: 'a4479453-b457-4f6b-ae06-3e4016db77f8',
                  marketplaceUser: {
                    id: '8bff118f-ffa5-4db5-badb-649b629225ca',
                    username: null,
                    avatar: null,
                  },
                },
                myBid: null,
              },
            },
          ],
        },
      } /* as IIMojitoCollectionItemCurrentBidsRequest */,
    ),
  );
}
