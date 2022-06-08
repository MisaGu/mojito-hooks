import { EMojitoKey } from '../../domain/enums/state.enum';
import { ProfileResponse } from '../../domain/interfaces';
import { BaseQueryHookPropsWithForce } from '../../domain/interfaces/hooks.interface';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function transformFn(response?: ProfileResponse) {
  if (!response) return undefined;

  return response.me.user;
}

export type UseMojitoUserData = ReturnType<typeof transformFn>;

export type UseMojitoUserReturn = ReturnType<typeof useMojitoUser>;

export type UseMojitoUserProps = BaseQueryHookPropsWithForce<UseMojitoUserData>;

export function useMojitoUser({ force, options }: UseMojitoUserProps = {}) {
  return useMojitoFactory({
    as: 'user',
    query: EMojitoKey.profile,
    options,
    selectFn: transformFn,
    force,
    onlyAuthenticated: true,
  });
}

export default useMojitoUser;

// legacy function
/*

export function useProfile(props?: { force?: boolean }): {
  profile: IMojitoProfile;
} & ReturnType<typeof useMojito> {
  const result = useMojito({
    query: EMojitoKey.profile,
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
