import { ContentfulAuthorsQuery } from '../../domain/interfaces';

export function resolveGetContentfulAuthors(req, res, ctx) {
  return res(
    ctx.data({
      authorCollection: {
        items: [
          {
            sys: {
              publishedAt: '2021-11-24T11:38:28.018Z',
            },
            about: '...',
            name: 'Mock Author 1',
            slug: 'mock-author-1',
            avatar: {
              url: 'https://mock-cdn/mock-author-1-avatar.png',
              title: 'Mock Author 1',
            },
            linkedFrom: {
              lotCollection: {
                items: [
                  {
                    mojitoId: 'mock-item-id-1',
                    title: 'Mock Item 1',
                    slug: 'mock-item-1',
                  },
                ],
              },
            },
          },
          {
            sys: {
              publishedAt: '2021-11-24T11:38:28.018Z',
            },
            about: '...',
            name: 'Mock Author 2',
            slug: 'mock-author-2',
            avatar: {
              url: 'https://mock-cdn/mock-author-2-avatar.png',
              title: 'Mock Author 2',
            },
            linkedFrom: {
              lotCollection: {
                items: [
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
          },
        ],
      },
    } as ContentfulAuthorsQuery),
  );
}
