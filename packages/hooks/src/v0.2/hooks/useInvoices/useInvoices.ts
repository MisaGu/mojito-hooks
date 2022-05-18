export function useInvoices() {
  return true;
}

// legacy function
/*

export function useInvoices(): {
  invoices: IMojitoInvoice[];
} & ReturnType<typeof useMojito> {
  const result = useMojito({
    query: EMojitoQueries.invoices,
    onlyAuthenticated: true,
  });

  return {
    invoices: result?.data?.getMyInvoices,
    ...result,
  };
}


*/
