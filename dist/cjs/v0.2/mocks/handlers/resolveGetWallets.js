'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.resolveGetWallets = void 0;

function resolveGetWallets(req, res, ctx) {
  return res(
    ctx.data({
      me: {
        id: 'mock-user-id',
        wallets: [
          {
            id: 'mock-wallet-id',
            name: 'Mock Rinkeby Testnet Wallet',
            address: '0x1646BB353Ce7E259fB1BaC65Da64b469b648b5Da',
            parentType: 'user',
            parentID: 'mock-user-id',
            networkId: 'ee800f19-d924-405a-9189-c561dad8af29',
            network: {
              chainID: 4,
            },
            tokens: [
              {
                id: 96,
                title: '',
                contractAddress: '0x1646BB698bc7E259fB1BaC65Da64b469b64851bc',
                timeLastUpdated: '2022-05-13T15:18:24.011Z',
                metadata: {
                  name: '',
                  description: '',
                  image: 'https://mock-cdn/mock-token-image.png',
                  attributes: [],
                },
              },
            ],
          },
        ],
      }, // TODO: Missing type here: as IMojitoWalletsRequest
    }),
  );
}

exports.resolveGetWallets = resolveGetWallets;
