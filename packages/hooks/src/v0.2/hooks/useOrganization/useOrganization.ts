export function useOrganization() {
  return true;
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
