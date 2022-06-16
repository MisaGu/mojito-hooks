'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.resolveGetOrganization = void 0;

function resolveGetOrganization(req, res, ctx) {
  return res(
    ctx.data({
      serverTime: '2022-05-25T14:19:43Z',
      me: {
        id: 'mock-user-id',
        user: {
          id: 'mock-user-id',
          username: 'mock-username',
          email: 'mock-user@mojito.xyz',
        },
        userOrgs: [
          {
            id: 'mock-organization-to-user-id',
            organizationId: 'mock-organization-id',
            role: 'Admin',
            bidAllowed: false,
            kycStatus: '',
            avatar: null,
            username: null,
            settings: null,
            externalUserId: '   ',
          },
        ],
      }, // TODO: Missing type here: as IMojitoProfileRequest (the current IMojitoProfileRequest is wrong and includes many other things)
    }),
  );
}

exports.resolveGetOrganization = resolveGetOrganization;
