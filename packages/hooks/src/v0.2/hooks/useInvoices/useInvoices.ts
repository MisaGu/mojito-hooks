import { EMojitoQueries } from '../../domain/gql/queries';
import { IMojitoGetMyInvoicesRequest } from '../../domain/interfaces';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function transformFn(profileRequest?: IMojitoGetMyInvoicesRequest) {
  if (!profileRequest) return undefined;

  return profileRequest.getMyInvoices;
}

export type UseMyInvoicesData = ReturnType<typeof transformFn>;

export type UseMyInvoicesReturn = ReturnType<typeof useInvoices>;

export type UseMyInvoicesProps = BaseQueryHookProps<UseMyInvoicesData>;

export function useInvoices({ options }: UseMyInvoicesProps = {}) {
  return useMojitoFactory({
    as: 'invoices',
    query: EMojitoQueries.invoices,
    options,
    transformFn,
    onlyAuthenticated: true,
  });
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
