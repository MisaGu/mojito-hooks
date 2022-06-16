import { UserOrganizationResponse } from '../../domain/interfaces';
import { BaseQueryHookPropsWithForce } from '../../domain/interfaces/hooks.interface';
declare function selectorFn(
  response?: UserOrganizationResponse,
): import('../../domain/interfaces').MojitoUserOrganization | undefined;
export declare type UseOrganizationData = ReturnType<typeof selectorFn>;
export declare type UseOrganizationReturn = ReturnType<typeof useOrganization>;
export declare type UseOrganizationProps = BaseQueryHookPropsWithForce<UseOrganizationData>;
export declare function useOrganization({
  force,
  options,
}?: UseOrganizationProps): import('../../domain/utils/gqlResult.utils').QueryResult<
  'organization',
  any,
  Error
>;
export default useOrganization;
