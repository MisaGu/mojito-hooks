'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.resolveGetContentfulFullLot = void 0;

function resolveGetContentfulFullLot(req, res, ctx) {
  return res(
    ctx.data({
      lotCollection: {
        items: [
          {
            lotId: 17,
            sys: {
              publishedAt: '2022-02-18T21:06:18.714Z',
            },
            title: 'Thought as a system #6/50',
            subtitle: null,
            imagesCollection: {
              items: [
                {
                  url: 'https://images.ctfassets.net/fu9did2d8yaw/UBmFtd1jZIiCgXBLzq5Z1/d8aaba9955f5d1d6da9550eacec308b1/ND1.2_Thought-as-a-system_Preview.png',
                  title: 'Thought as a System #6/50',
                  contentType: 'image/png',
                },
              ],
            },
            createdAt: '2020-11-20T00:00:00.000Z',
            estimatePrice: null,
            purchasedAt: '2021-03-16T00:00:00.000Z',
            smartContractAddress: '0x4ac3d17fd6c2db18ec619fe2d68d2c22b18378ff',
            tokenId: '11600030006',
            mojitoId: '5f6a59f0-63bb-4628-b0ff-fcad26559a09',
            author: {
              about:
                'Visor is an important artwork from Mad Dog Jones’ 2019 Tokyo exhibition ‘AFTERL-IFE WORLD,’ a series that contemplates an amalgam of alternate realities; the hyphen in the title points to the unexpected breaks in life, moments of pause and reflection. Visor emphasizes the moments in life to reflect and examine art, quotidian life, and our world. Highlighting the neon-accented hues and striking animation that compose the present work, Dowbak explains, “I have always found beauty in colors with backlighting. There is a mystical power in colors that emits light via power. NFT’s have allowed me to distribute my art to collectors in its natural form.” Deftly integrating reality and the surreal imagined universe of the present work, Visor embodies the themes and virtuosity that characterize Mad Dog Jones as a leading NFT artist.\n',
              name: 'Mad Dog Jones',
              slug: 'mad-dog-jones',
              avatar: {
                url: 'https://images.ctfassets.net/fu9did2d8yaw/p9Ci1Lw3OfeHfeHT2oysW/d32846a84de8d677fa155974dd610b27/960x0-683x1024.jpeg',
                title: 'Mad Dog Jones avatar',
              },
            },
            collector: {
              name: '888',
              slug: '888',
              about:
                'Anonymous collector 888 lives and breathes digital art from behind their avatar profile picture. Little can be found about them, but one thing is for certain: they wholeheartedly support and contribute to the NFT ecosystem.\n\nThey aim to spread and promote positivity within the space, best shown in their Twitter bio explaining their pseudonym: “Angel #888 is a reminder to thank the universe for blessings & miracles that enter your life & trust that everything is always working out not only for your highest good but for the highest good of all. 8 is also the symbol for infinity, all times, forever, & never-ending.”',
              smartContractAddress: '0x716eb921f3b346d2c5749b5380dc740d359055d7',
              avatar: {
                url: 'https://images.ctfassets.net/fu9did2d8yaw/fHmXsOiDpFTpyyoFt1adF/2bee40eb3668003edeff2355be320073/ND2_Collector_888.jpeg',
                title: '888',
              },
              videoId: null,
              twitterLink: 'https://twitter.com/crypto888crypto',
            },
            aboutLot:
              'As with most artwork by Mad Dog Jones, Thought as a system feels like you’ve stumbled upon a moment within a storyline and you need to piece together the clues. The unknown yellow liquid, fingerprints on the buttons and receiver, the many symbols, plus sound effects of cars screeching all add up to create something enveloping.\n\nThe artist’s signature can be found on a can of drink that comes with a warning and a stubbed out cigarette. On the phone itself is the name of the artwork, passing by over and over as if someone has just read it and made a swift exit. The more you look at Thought as a system, the more you find to love.\n\nThis was part of Mad Dog Jones’ first ever tokenized artwork collection. Another piece from the collection, Ideas r the currency, has also been available for Natively Digital 1.2. Both take part in what looks like the same location, but where this piece is dark and ominous, Ideas r the currency is its brighter and natural sibling.\n\nA big clue as to why the artist made these so similar yet so different comes from the book sitting on top of the pay phone. Thought as a System by David Bohm explores the manner in which thought actively participates in forming our perceptions.',
            note: null,
            history: [
              {
                date: 'November 20, 2020',
                price: 'Minted',
                buyerName: 'nifty-gateway-omnibus',
                smartContractAddress:
                  '0x129dab1c36ee5a9e1983e832ce063ce9e690d4854aadcf0dc2fcb4cc680b1d62',
              },
              {
                date: 'March 16, 2021',
                price: 'Transferred',
                buyerName: '888',
                smartContractAddress:
                  '0x7a432a6ab2581ed07a1dd22f819dadf584826477d73fe1c0f8c61b9f490fe0b4',
              },
            ],
            video: null,
            conditionReportText: null,
            shortCollectorDescription: null,
            nftLink: null,
            slug: 'thought_as_a_system_650',
            nftVideoIds: ['6273756981001'],
            lotPreviewBackgroundColor: null,
            gridPreviewImage: null,
          },
        ],
      },
    }),
  );
}

exports.resolveGetContentfulFullLot = resolveGetContentfulFullLot;
