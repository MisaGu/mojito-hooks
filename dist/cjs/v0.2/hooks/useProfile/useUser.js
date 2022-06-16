'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.useUser = void 0;

var state_enum_1 = require('../../domain/enums/state.enum');

var useMojitoFactory_1 = require('../useMojitoFactory/useMojitoFactory');

function selectorFn(response) {
  if (!response) return undefined;
  return response.me.user;
}

function useUser(_a) {
  var _b = _a === void 0 ? {} : _a,
    force = _b.force,
    options = _b.options;

  return (0, useMojitoFactory_1.useMojitoFactory)({
    as: 'user',
    query: state_enum_1.EMojitoKey.profile,
    options: options,
    selectorFn: selectorFn,
    force: force,
    onlyAuthenticated: true,
  });
}

exports.useUser = useUser;
exports['default'] = useUser; // legacy function

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
