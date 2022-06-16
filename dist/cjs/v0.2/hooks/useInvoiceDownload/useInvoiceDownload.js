'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.useInvoiceDownload = void 0;

function useInvoiceDownload() {
  return true;
}

exports.useInvoiceDownload = useInvoiceDownload; // legacy function

/*

export function useInvoiceDownload(invoiceId: string): {
  downloadInvoice: ReturnType<typeof useQuery>['refetch'];
  invoiceLoading: boolean;
  error: ReturnType<typeof useQuery>['error'];
} {
  const { getIdTokenClaims } = useAuth0();

  const downloadPDF = (pdfBase64String: string, fileName: string) => {
    if (!pdfBase64String) return;

    let downloadLink: HTMLAnchorElement | null = document.createElement('a');
    downloadLink.href = `data:application/pdf;base64,${pdfBase64String}`;
    downloadLink.download = fileName;
    downloadLink.click();
    downloadLink = null;
  };

  const result = useQuery(
    [`Mojito Invoice ${invoiceId}`],
    async () => {
      const token = await getIdTokenClaims();
      if (token) {
        axios
          .get(`${config.INVOICE_URL}?id=${invoiceId}`, {
            headers: { authorization: `Bearer ${token.__raw}` },
          })
          .then((response) => {
            if (response) {
              downloadPDF(response?.data?.invoiceBase64String, `invoice-${invoiceId}.pdf`);
            }
          });
      }
    },
    {
      enabled: false,
    },
  );

  return {
    downloadInvoice: result.refetch,
    invoiceLoading: result.isLoading,
    error: result.error,
  };
}

*/
