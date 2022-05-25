import { IContentfulOrganizationQuery } from '../../domain/interfaces';

export function resolveGetContentfulOrganizations(req, res, ctx) {
  return res(
    ctx.data({
      organizationCollection: {
        items: [
          {
            homepageRedirect: {
              name: 'Mock Collection',
              slug: 'mock-collection',
            },
          },
        ],
      },
    } as IContentfulOrganizationQuery),
  );
}
