import { EMojitoKey } from '../../domain/enums/state.enum';
import { MojitoGetMyInvoicesResponse } from '../../domain/interfaces';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function transformFn(response?: MojitoGetMyInvoicesResponse) {
  if (!response) return undefined;

  return response.getMyInvoices;
}

export type UseInvoicesData = ReturnType<typeof transformFn>;

export type UseInvoicesReturn = ReturnType<typeof useInvoices>;

export type UseInvoicesProps = BaseQueryHookProps<UseInvoicesData>;

export function useInvoices({ options }: UseInvoicesProps = {}) {
  return useMojitoFactory({
    as: 'invoices',
    query: EMojitoKey.invoices,
    options,
    transformFn,
    onlyAuthenticated: true,
  });
}

export default useInvoices;
