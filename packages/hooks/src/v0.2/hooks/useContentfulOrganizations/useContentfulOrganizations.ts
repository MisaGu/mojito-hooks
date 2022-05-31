import { IContentfulOrganizationQuery } from '../../domain/interfaces';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
import { useContentfulFactory } from '../useContentfulFactory/useContentfulFactory';
import { EContentfulQueries } from '../../domain/gql/contentful';

function transformFn(organizationsQuery?: IContentfulOrganizationQuery) {
  if (!organizationsQuery) return undefined;

  return organizationsQuery.organizationCollection?.items || [];
}

export type UseContentfulOrganizationsData = ReturnType<typeof transformFn>;

export type UseContentfulOrganizationsReturn = ReturnType<typeof useContentfulOrganizations>;

export type UseContentfulOrganizationsProps = BaseQueryHookProps<UseContentfulOrganizationsData>;

export function useContentfulOrganizations({ options }: UseContentfulOrganizationsProps = {}) {
  return useContentfulFactory({
    as: 'organizations',
    query: EContentfulQueries.organizations,
    options,
    transformFn,
  });
}
