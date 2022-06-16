import { MojitoGetMyInvoicesResponse } from '../../domain/interfaces';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
declare function selectorFn(
  response?: MojitoGetMyInvoicesResponse,
): import('../../domain/interfaces').MojitoInvoiceDetails[] | undefined;
export declare type UseInvoicesData = ReturnType<typeof selectorFn>;
export declare type UseInvoicesReturn = ReturnType<typeof useInvoices>;
export declare type UseInvoicesProps = BaseQueryHookProps<UseInvoicesData>;
export declare function useInvoices({
  options,
}?: UseInvoicesProps): import('../../domain/utils/gqlResult.utils').QueryResult<
  'invoices',
  any,
  Error
>;
export default useInvoices;
