import { ContentfulCollectorsQuery } from '../../domain/interfaces';

export function resolveGetContentfulCollectors(req, res, ctx) {
  return res(
    ctx.data({
      collectorCollection: {
        items: [
          {
            sys: {
              publishedAt: '2021-09-29T10:07:59.396Z',
            },
            name: 'Mock Collector 1',
            about: '...',
            smartContractAddress: '0x5a4e9865ae4c65a46a5ec69a4e65ac465e4a6ec4',
            linkedFrom: {
              lotCollection: {
                items: [
                  {
                    mojitoId: 'mock-item-id-1',
                    title: 'Mock Item 1',
                    slug: 'mock-item-1',
                  },
                  {
                    mojitoId: 'mock-item-id-2',
                    title: 'Mock Item 2',
                    slug: 'mock-item-2',
                  },
                  {
                    mojitoId: 'mock-item-id-3',
                    title: 'Mock Item 3',
                    slug: 'mock-item-3',
                  },
                ],
              },
            },
            avatar: {
              url: 'https://mock-cdn/mock-collector-1-avatar.png',
              title: 'Mock Collector 1',
            },
            videoId: null,
            twitterLink: 'https://twitter.com/mock-collector-1',
            slug: 'mock-collector-1',
          },
          {
            sys: {
              publishedAt: '2021-09-30T04:19:36.121Z',
            },
            name: 'Mock Collector 2',
            about: '2',
            smartContractAddress: '0xa4e956dc4b4cd554cd5b854a54a45ac465e4a6ec',
            linkedFrom: {
              lotCollection: {
                items: [
                  {
                    mojitoId: 'mock-item-id-4',
                    title: 'Mock Item 4',
                    slug: 'mock-item-4',
                  },
                  {
                    mojitoId: 'mock-item-id-5',
                    title: 'Mock Item 5',
                    slug: 'mock-item-5',
                  },
                  {
                    mojitoId: 'mock-item-id-6',
                    title: 'Mock Item 6',
                    slug: 'mock-item-6',
                  },
                ],
              },
            },
            avatar: {
              url: 'https://mock-cdn/mock-collector-2-avatar.png',
              title: 'Mock Collector 2',
            },
            videoId: null,
            twitterLink: 'https://twitter.com/mock-collector-2',
            slug: 'mock-collector-2',
          },
        ],
      },
    } as ContentfulCollectorsQuery),
  );
}
