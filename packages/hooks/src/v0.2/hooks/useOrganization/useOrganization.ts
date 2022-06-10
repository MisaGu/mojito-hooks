import { EMojitoKey } from '../../domain/enums/state.enum';
import { UserOrganizationResponse } from '../../domain/interfaces';
import { BaseQueryHookPropsWithForce } from '../../domain/interfaces/hooks.interface';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function selectorFn(response?: UserOrganizationResponse) {
  if (!response) return undefined;

  return response.me.userOrgs?.[0];
}

export type UseOrganizationData = ReturnType<typeof selectorFn>;

export type UseOrganizationReturn = ReturnType<typeof useOrganization>;

export type UseOrganizationProps = BaseQueryHookPropsWithForce<UseOrganizationData>;

export function useOrganization({ force, options }: UseOrganizationProps = {}) {
  return useMojitoFactory({
    as: 'organization',
    query: EMojitoKey.profile,
    options,
    selectorFn,
    force,
    onlyAuthenticated: true,
  });
}

export default useOrganization;
