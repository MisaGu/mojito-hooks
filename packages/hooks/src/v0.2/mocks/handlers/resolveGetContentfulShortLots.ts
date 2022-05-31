import { IContentfulLotsQuery } from '../../domain/interfaces';

// TODO: These data/type is wrong (short lots should have less data):

export function resolveGetContentfulShortLots(req, res, ctx) {
  return res(
    ctx.data({
      lotCollection: {
        items: [
          {
            sys: {
              publishedAt: '2022-02-18T21:06:18.714Z',
            },
            lotId: 17,
            title: 'Thought as a system #6/50',
            subtitle: null,
            mojitoId: '5f6a59f0-63bb-4628-b0ff-fcad26559a09',
            author: {
              name: 'Mad Dog Jones',
              slug: 'mad-dog-jones',
              avatar: {
                url: 'https://images.ctfassets.net/fu9did2d8yaw/p9Ci1Lw3OfeHfeHT2oysW/d32846a84de8d677fa155974dd610b27/960x0-683x1024.jpeg',
              },
            },
            collector: {
              name: '888',
              slug: '888',
              avatar: {
                url: 'https://images.ctfassets.net/fu9did2d8yaw/fHmXsOiDpFTpyyoFt1adF/2bee40eb3668003edeff2355be320073/ND2_Collector_888.jpeg',
              },
            },
            slug: 'thought_as_a_system_650',
            gridPreviewImage: null,
            imagesCollection: {
              items: [
                {
                  url: 'https://images.ctfassets.net/fu9did2d8yaw/UBmFtd1jZIiCgXBLzq5Z1/d8aaba9955f5d1d6da9550eacec308b1/ND1.2_Thought-as-a-system_Preview.png',
                  title: 'Thought as a System #6/50',
                },
              ],
            },
          },
          {
            sys: {
              publishedAt: '2022-02-18T21:27:36.926Z',
            },
            lotId: 28,
            title: 'Wrapped MoonCats #3174',
            subtitle: null,
            mojitoId: '600f19c6-0bad-4442-bc69-1d2db645292c',
            author: {
              name: 'Ponderware',
              slug: 'ponderware',
              avatar: {
                url: 'https://images.ctfassets.net/fu9did2d8yaw/314U28LCWpkad3CIcAndRC/be1cdd4130ae17fdccd4966cf482cb4e/ND2_Artist_Ponderware.png',
              },
            },
            collector: {
              name: '888',
              slug: '888',
              avatar: {
                url: 'https://images.ctfassets.net/fu9did2d8yaw/fHmXsOiDpFTpyyoFt1adF/2bee40eb3668003edeff2355be320073/ND2_Collector_888.jpeg',
              },
            },
            slug: 'wrapped_mooncats_3174',
            gridPreviewImage: null,
            imagesCollection: {
              items: [
                {
                  url: 'https://images.ctfassets.net/fu9did2d8yaw/5Br2Yp7PNWpTXGW7kqghp/ae66ffe412bf80fae1b670d4a7914080/wrappedMoonCats3174.png',
                  title: 'Wrapped MoonCats #3174',
                },
              ],
            },
          },
        ],
      },
    } as IContentfulLotsQuery),
  );
}
