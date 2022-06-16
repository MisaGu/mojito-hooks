export function resolveGetInvoices(req, res, ctx) {
  return res(
    ctx.data({
      getMyInvoices: [
        {
          invoiceID: 'mock-invoice-id-1',
          invoiceNumber: 7030,
          invoiceCreatedAt: '2022-05-23T00:18:12Z',
          status: 'Expired',
          items: [
            {
              collectionItemId: 'mock-collection-item-id',
              collectionTitle: '',
              destinationAddress: '0x1646BB353Ce7E259fB1BaC65Da64b469b648b5Da',
              collectionItemTitle: 'Mock Collection Item',
              units: 1,
              unitPrice: 100,
              buyersPremium: 0,
              overheadPremium: 0,
              totalPrice: 100,
              saleDate: '2022-05-23T00:18:12Z',
              taxes: 0,
              salesTaxRate: 0,
            },
          ],
        },
      ],
    }),
  );
}
