import { EMojitoQueries } from '../../domain/gql/queries';
import { IMojitoProfileResponse } from '../../domain/interfaces';
import { BaseQueryHookPropsWithForce } from '../../domain/interfaces/hooks.interface';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function transformFn(response?: IMojitoProfileResponse) {
  if (!response) return undefined;

  return response.me.userOrgs[0];
}

export type UseOrganizationData = ReturnType<typeof transformFn>;

export type UseOrganizationReturn = ReturnType<typeof useOrganization>;

export type UseOrganizationProps = BaseQueryHookPropsWithForce<UseOrganizationData>;

export function useOrganization({ force, options }: UseOrganizationProps = {}) {
  return useMojitoFactory({
    as: 'organization',
    query: EMojitoQueries.organization,
    options,
    transformFn,
    force,
    onlyAuthenticated: true,
  });
}

// legacy function
/*

export function useOrganization(options: UseQueryOptions<any> = {}): {
  organization: (IMojitoProfileUserOrg & IMojitoProfileCustomOrgs) | null;
} & ReturnType<typeof useMojito> {
  const result = useMojito({
    query: EMojitoQueries.organization,
    options,
    onlyAuthenticated: true,
  });

  const profile = result?.data?.me;
  const organization = profile?.userOrgs?.[0];

  useEffect(() => {
    if (!profile || !organization) return;

    Sentry.setUser({ id: profile.id });
    Sentry.setTag('profileID', profile.id);
    Sentry.setTag('organizationID', organization.id);
  }, [profile, organization]);

  return {
    organization,
    ...result,
  };
}


*/
