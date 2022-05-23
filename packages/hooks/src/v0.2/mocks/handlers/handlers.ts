import { graphql } from 'msw';
import { resolveCheckUsername } from './resolveCheckUsername';
import { resolveGetCollectionBySlug } from './resolveGetCollectionBySlug';
import { resolveGetCollectionBySlugCurrentBids } from './resolveGetCollectionBySlugCurrentBids';
import { resolveGetCollectionItemByIdBidsList } from './resolveGetCollectionItemByIdBidsList';
import { resolveGetCollectionItemByIdRemainingCount } from './resolveGetCollectionItemByIdRemainingCount';
import { resolveGetCollectionLotsIdList } from './resolveGetCollectionLotsIdList';
import { resolveGetInvoices } from './resolveGetInvoices';
import { resolveGetMarketplaceCollectionsInfoWithItemsIdAndSlug } from './resolveGetMarketplaceCollectionsInfoWithItemsIdAndSlug';
import { resolveGetOneLot } from './resolveGetOneLot';
import { resolveGetOrganization } from './resolveGetOrganization';
import { resolveGetProfile } from './resolveGetProfile';
import { resolveGetServerTime } from './resolveGetServerTime';
import { resolveGetUserActiveBids } from './resolveGetUserActiveBids';
import { resolveGetUserFavorites } from './resolveGetUserFavorites';
import { resolveGetWallets } from './resolveGetWallets';

export const handlers = [
  // graphql.mutation('Login', null),

  graphql.query('GetProfile', resolveGetProfile),
  graphql.query('GetOrganization', resolveGetOrganization),
  graphql.query('GetWallets', resolveGetWallets),
  graphql.query('GetInvoices', resolveGetInvoices),
  graphql.query('GetUserActiveBids', resolveGetUserActiveBids),
  graphql.query('GetUserFavorites', resolveGetUserFavorites),
  graphql.query('CheckUsername', resolveCheckUsername),
  graphql.query('GetCollectionBySlug', resolveGetCollectionBySlug),
  graphql.query('GetCollectionBySlugCurrentBids', resolveGetCollectionBySlugCurrentBids),
  graphql.query('GetCollectionItemByIdRemainingCount', resolveGetCollectionItemByIdRemainingCount),
  graphql.query('GetCollectionItemByIdBidsList', resolveGetCollectionItemByIdBidsList),
  graphql.query('GetCollectionLotsIdList', resolveGetCollectionLotsIdList),
  graphql.query('GetOneLot', resolveGetOneLot),
  graphql.query(
    'GetMarketplaceCollectionsInfoWithItemsIdAndSlug',
    resolveGetMarketplaceCollectionsInfoWithItemsIdAndSlug,
  ),
  graphql.query('GetServerTime', resolveGetServerTime),
];
