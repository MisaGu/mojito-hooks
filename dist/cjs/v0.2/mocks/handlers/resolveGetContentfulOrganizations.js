'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.resolveGetContentfulOrganizations = void 0;

function resolveGetContentfulOrganizations(req, res, ctx) {
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
    }),
  );
}

exports.resolveGetContentfulOrganizations = resolveGetContentfulOrganizations;
