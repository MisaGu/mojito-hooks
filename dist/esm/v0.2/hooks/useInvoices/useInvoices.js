import { EMojitoKey } from '../../domain/enums/state.enum';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function selectorFn(response) {
  if (!response) return undefined;
  return response.getMyInvoices;
}

export function useInvoices(_a) {
  var _b = _a === void 0 ? {} : _a,
    options = _b.options;

  return useMojitoFactory({
    as: 'invoices',
    query: EMojitoKey.invoices,
    options: options,
    selectorFn: selectorFn,
    onlyAuthenticated: true,
  });
}
export default useInvoices;
