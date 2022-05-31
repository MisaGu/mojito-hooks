import { EMojitoQueries } from '../../domain/gql/queries';
import { IMojitoProfileResponse } from '../../domain/interfaces';
import { BaseQueryHookPropsWithForce } from '../../domain/interfaces/hooks.interface';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function transformFn(profileRequest?: IMojitoProfileResponse) {
  if (!profileRequest) return undefined;

  return profileRequest.me;
}

export type UseProfileData = ReturnType<typeof transformFn>;

export type UseProfileReturn = ReturnType<typeof useProfile>;

export type UseProfileProps = BaseQueryHookPropsWithForce<UseProfileData>;

export function useProfile({ force, options }: UseProfileProps = {}) {
  return useMojitoFactory({
    as: 'profile',
    query: EMojitoQueries.profile,
    options,
    transformFn,
    force,
    onlyAuthenticated: true,
  });
}
// legacy function
/*

export function useProfile(props?: { force?: boolean }): {
  profile: IMojitoProfile;
} & ReturnType<typeof useMojito> {
  const result = useMojito({
    query: EMojitoQueries.profile,
    force: props?.force,
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
    profile,
    ...result,
  };
}


*/
