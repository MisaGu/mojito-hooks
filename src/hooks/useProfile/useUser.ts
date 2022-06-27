import { QueryKey } from '../../domain/utils/queryKeyFactory.util';
import { EMojitoKey } from '../../domain/enums/state.enum';
import { ProfileResponse } from '../../domain/interfaces';
import { BaseQueryHookPropsWithForce } from '../../domain/interfaces/hooks.interface';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';

function selectorFn(response?: ProfileResponse) {
  if (!response) return undefined;

  try {
    return response.me.user;
  } catch (e) {
    console.log(response);
    return undefined;
  }
}

export type UseMojitoUserData = ReturnType<typeof selectorFn>;

export type UseMojitoUserReturn = ReturnType<typeof useUser>;

export type UseMojitoUserProps = BaseQueryHookPropsWithForce<UseMojitoUserData>;

export function useUser({ force, options }: UseMojitoUserProps = {}) {
  return useMojitoFactory({
    as: 'user',
    queryKey: QueryKey.get(EMojitoKey.profile),
    options,
    selectorFn,
    force,
    onlyAuthenticated: true,
  });
}

export default useUser;

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
