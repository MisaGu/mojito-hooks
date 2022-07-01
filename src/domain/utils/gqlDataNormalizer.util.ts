import omit from 'lodash.omit';
import moment from 'moment';
import { config } from '../constants/general.constants';
import { EContentfulKey, EMojitoKey } from '../enums/state.enum';
import {
  ContentfulAuctionBySlugResponse,
  ContentfulCollectionItem,
  CurrentUserResponse,
  MojitoCurrentUser,
  MojitoMarketplaceAuctionBid,
  MojitoMarketplaceCollection,
  MojitoMarketplaceCollectionItem,
  MojitoOrganization,
  MojitoQuery,
  MojitoUserOrganization,
  MojitoWallet,
} from '../interfaces';
import { Combine, DeepCompare } from '../interfaces/_utils.interface';
import * as Schema from '../interfaces/mojito-schema.interface';
import { queryClient } from './gqlRequest.util';
import { QueryKey } from './queryKeyFactory.util';

const extendCollectionSingleItem = (
  item: any,
  slug: string,
  shortLots?: {
    [key: string]: ContentfulCollectionItem;
  },
) => {
  const _item = item as MojitoMarketplaceCollectionItem<Schema.MarketplaceSaleType.Auction>;

  const __itemAsBuyNow = item as MojitoMarketplaceCollectionItem<Schema.MarketplaceSaleType.BuyNow>;

  if (__itemAsBuyNow?.details?.remainingCount < 0) {
    __itemAsBuyNow.details.remainingCount = 0;
  }

  if (!_item?.details?.bids && !_item?.details?.currentBid) {
    const lot = queryClient.getQueryData<{ [key: string]: ContentfulCollectionItem }>(
      QueryKey.get(EContentfulKey.fullLot, { mojitoId: item.id }),
    );

    (item as MojitoMarketplaceCollectionItem).content =
      lot?.[item.id] ??
      shortLots?.[item.id] ??
      ({
        lotId: -1,
        title: 'NA',
        subtitle: 'NA',
        mojitoId: 'NA',
        slug: 'NA',
      } as ContentfulCollectionItem);
  }

  if (item?.details) {
    item.details = extendItemDetails(item.details, slug);
  }

  return item as any;
};

const extendCollectionItems = (
  collectionItems: MojitoMarketplaceCollectionItem[],
  slug: string,
) => {
  const lots = queryClient.getQueryData<{
    [key: string]: ContentfulCollectionItem;
  }>(QueryKey.get(EContentfulKey.shortLots, { slug }));

  return collectionItems.map((item) => extendCollectionSingleItem(item, slug, lots));
};

const extendItemDetails = (details: any, slug: string) => {
  const profile = queryClient.getQueryData<CurrentUserResponse>(
    QueryKey.get(EMojitoKey.profile),
  )?.me;

  const item = queryClient
    .getQueryData<{ items }>(
      QueryKey.get(EMojitoKey.collectionBySlugCurrentBids, {
        slug,
        marketplaceID: config.MARKETPLACE_ID,
      }),
    )
    ?.items?.find((e) => e.details.id === details.id);

  const oldDetails = item?.details;

  if (details.startDate && details.endDate) {
    const auctionStartUnix = moment(details.startDate).unix();
    const auctionEndUnix = moment(details.endDate).unix();
    const nowUnix = moment().unix();

    Object.assign(details, {
      endTimestamp: auctionEndUnix - nowUnix,
      saleView: {
        isPreSale: nowUnix <= auctionStartUnix,
        isDuringSale: nowUnix > auctionStartUnix && nowUnix < auctionEndUnix,
        isPostSale: nowUnix >= auctionEndUnix,
      },
    });
  }

  // @ts-ignore
  if (details?.bids) {
    let _bids = details.bids;

    _bids = _bids?.sort((a, b) => (a.amount > b.amount ? -1 : 1));

    if (profile) {
      let _youFirstBidIndex = -1;

      _bids = _bids.map((bid, idx) => {
        bid.isMine = profile.id === bid.marketplaceUser.id;

        if (_youFirstBidIndex == -1 && bid.isMine) {
          _youFirstBidIndex = idx;
        }

        return bid;
      });

      if (_youFirstBidIndex == 0) {
        _bids[0].isHold = true;
      } else if (_youFirstBidIndex > 0) {
        _bids[_youFirstBidIndex].isOutbid = true;

        if (_bids[0].amount == _bids[_youFirstBidIndex].amount) {
          _bids[_youFirstBidIndex].isInfo = true;
        }
      }
    }
    Object.assign(details, { bids: _bids });
  }

  if (details.currentBid) {
    const _userBid = details.myBid;
    const _currentBid = details.currentBid;
    const _userHoldBid = _userBid?.id == _currentBid?.id;

    if (details.saleView?.isDuringSale) {
      if (_userHoldBid) details.currentBid.isHold = true;
      else if (_userBid) details.currentBid.isOutbid = true;
      else details.currentBid.isCurrent = true;
    } else if (details.saleView?.isPostSale) {
      if (_userBid && _userHoldBid) details.currentBid.isWin = true;
      else if (_userBid) details.currentBid.isLost = true;
      else details.currentBid.isSold = true;
    }
  } else if (oldDetails?.currentBid) {
    details.currentBid = oldDetails?.currentBid;
  } else if (details?.currentBid === null) {
    details.currentBid = {
      amount: details.startingBid ?? 50, // 50 = bidIncrement[0]
      isStart: true,
      marketplaceAuctionLotId: details.id,
    };
  } else {
    details.currentBid = null as any;
  }
  Object.assign(details, {
    currentBid: details.currentBid,
  });

  if (!details?.myBid && oldDetails?.myBid) {
    Object.assign(details, {
      myBid: oldDetails.myBid,
    });
  }

  return details;
};

let normalizer_glob_options: {
  raw_response?: Schema.Query;
  variables?: { slug?: string };
  key?: any;
  content: {
    shortLots?: {
      [key: string]: ContentfulCollectionItem;
    };
  };
} = { content: {} };

export async function mojitoNormalizer(
  raw_response: Schema.Query,
  variables?: { slug?: string },
  key?: any,
) {
  if (!raw_response) return null;
  const normalizedResponse = {};

  Object.assign(normalizer_glob_options, { raw_response, variables, key });

  if (raw_response.serverTime) {
    Object.assign(normalizedResponse, {
      serverTime: ServerTimeNormalizer(raw_response.serverTime),
    });
  }

  if (raw_response.me) {
    Object.assign(normalizedResponse, { me: CurrentUserNormalizer(raw_response.me) });
  }

  if (raw_response.collection) {
    Object.assign(normalizedResponse, {
      collection: MarketplaceCollectionNormalizer(raw_response.collection),
    });
  }

  if (raw_response.collectionBySlug) {
    Object.assign(normalizedResponse, {
      collectionBySlug: MarketplaceCollectionNormalizer(raw_response.collectionBySlug),
    });
  }

  if (raw_response.marketplace?.collections) {
    Object.assign(normalizedResponse, {
      marketplace: {
        collections: raw_response.marketplace.collections.map((collection) =>
          MarketplaceCollectionNormalizer(collection),
        ),
      },
    });
  }

  if (raw_response?.getMarketplaceAuctionLot) {
    raw_response.getMarketplaceAuctionLot = extendItemDetails(
      raw_response.getMarketplaceAuctionLot,
      variables?.slug as string,
    );
  }

  if (raw_response?.collectionItemById) {
    if (variables?.slug) {
      raw_response.collectionItemById = extendCollectionSingleItem(
        raw_response.collectionItemById,
        variables.slug,
      );
    }

    Object.assign(normalizedResponse, { collectionItemById: raw_response.collectionItemById });
  }

  if (raw_response?.getMyInvoices) {
    const lots = queryClient.getQueryData<{
      [key: string]: ContentfulCollectionItem;
    }>(QueryKey.get(EContentfulKey.shortLots, { slug: variables?.slug }));

    // _data.getMyInvoices = _data?.getMyInvoices.map((invoice) => {
    //   const lot = lots?.[invoice.collectionItemID];

    //   if (lot) {
    //     invoice.contentfulData = lot;
    //   }

    //   return invoice;
    // });
  }

  return normalizedResponse;
}

export function contentfulNormalizer(
  response: any,
  variables?: { slug?: string; mojitoId?: string },
  key?: any,
): any {
  if (!response) return null;
  const _data = response;

  if (_data?.lotCollection?.items) {
    const _items = _data?.lotCollection?.items as ContentfulCollectionItem[];

    return _items.reduce((acc, item) => Object.assign(acc, { [item.mojitoId]: item }), {});
  }

  return response;
}

// =================================================== NEW ===================================================

function ServerTimeNormalizer(details: Schema.Scalars['Time']) {
  const serverTime: MojitoQuery['serverTime'] = new Date(details);
  const serverTimeOffset = serverTime.getTime() - Date.now();

  moment.now = function () {
    return serverTimeOffset + Date.now();
  };

  return serverTime;
}

function CurrentUserNormalizer(details: Schema.CurrentUser) {
  const me = {
    ...details,
    wallets: details.wallets ? WalletsNormalizer(details.wallets) : [],
    wonBids: details.wonBids ? MojitoMarketplaceAuctionBidsNormalizer(details.wonBids) : [],
    activeBids: details.activeBids
      ? MojitoMarketplaceAuctionBidsNormalizer(details.activeBids)
      : [],
    userOrgs: details.userOrgs ? UserOrganizationNormalizer(details.userOrgs) : [],
    favoriteItems: null, //TODO
  };

  return _merge<typeof details, typeof me, MojitoCurrentUser>(details, me);
}

function WalletsNormalizer(details: Schema.Wallet[]) {
  const wallets = details.map((wallet) => Object.assign(wallet, WalletItemNormalizer(wallet)));

  return _merge<typeof details, typeof wallets, MojitoWallet[]>(details, wallets);
}

function WalletItemNormalizer(details: Schema.Wallet) {
  const wallet = {
    ...details,
    tokens: details.tokens
      ? details.tokens.map((token) => Object.assign(token, { walletId: details.id }))
      : [],
  };

  return _merge<typeof details, typeof wallet, MojitoWallet>(details, wallet);
}

function UserOrganizationNormalizer(details: Schema.UserOrganization[]) {
  const userOrs = details.map((organization) => {
    const role = organization.role;
    const isBasic = role === 'Basic';
    const isMissingInfo = role === 'MissingInformation';
    const isEndUser = role === 'EndUser';
    const isTransactionalNoID = role === 'TransactionalNoID';
    const isTransactionalWithID = role === 'TransactionalWithID';
    const isNotAllowedToBid = role === 'NotAllowedToBid';
    const isCoreUnavailable = role === 'CoreUnavailable';
    const isBidAuthUnavailable = role === 'BidAuthUnavailable';
    const completeYourProfile = isBasic || isMissingInfo || isEndUser;
    const uploadID = isTransactionalNoID;
    const contactUs = isNotAllowedToBid || isCoreUnavailable || isBidAuthUnavailable;

    return {
      ...omit(organization, ['user', 'organization']),
      notifications: {
        isTransactionalWithID,
        completeYourProfile,
        uploadID,
        contactUs,
      },
      hasNotifications: !!(completeYourProfile || uploadID || contactUs),
      settings: organization.settings
        ? JSON.parse(organization.settings)
        : { hasCompletedOnboarding: false },
    };
  });

  return _merge<typeof details, typeof userOrs, MojitoUserOrganization[]>(details, userOrs);
}

function OrganizationNormalizer(details: Schema.Organization) {
  const organization = {
    ...omit(details, ['marketplaces']),
    wallets: details.wallets ? WalletsNormalizer(details.wallets) : [],
    assets: [],
    nftContracts: [],
  };

  return _merge<typeof details, typeof organization, MojitoOrganization>(details, organization);
}

function MarketplaceCollectionNormalizer(details: Schema.MarketplaceCollection) {
  const content = queryClient.getQueryData<ContentfulAuctionBySlugResponse>(
    QueryKey.get(EContentfulKey.auctionBySlug, { slug: details.slug }),
  )?.auctionCollection?.items?.[0];

  const auctionStartUnix = moment(details.startDate ?? null).unix();
  const auctionEndUnix = moment(details.endDate ?? null).unix();
  const nowUnix = moment().unix();

  const itemsFilterStatus = {
    hasBuyNowItems: false,
    hasAuctionItems: false,
    hasClaimableItems: false,
  };

  if (details.items) {
    for (let i = 0; i < details.items.length; i++) {
      const { saleType } = details.items[i];

      switch (saleType) {
        case Schema.MarketplaceSaleType.BuyNow:
          {
            itemsFilterStatus.hasBuyNowItems = true;
          }
          break;

        case Schema.MarketplaceSaleType.Auction:
          {
            itemsFilterStatus.hasAuctionItems = true;
          }
          break;

        case Schema.MarketplaceSaleType.Claimable:
          {
            itemsFilterStatus.hasClaimableItems = true;
          }
          break;
      }
    }
  }

  const marketplaceCollection = {
    ...details,
    content,
    items: details.items ? MarketplaceCollectionItemsNormalizer(details.items) : [],
    ...itemsFilterStatus,
    saleStatus: {
      isPreSale: nowUnix < auctionStartUnix,
      isDuringSale: nowUnix > auctionStartUnix && nowUnix < auctionEndUnix,
      isPostSale: nowUnix > auctionEndUnix,
    },
  };

  return _merge<typeof details, typeof marketplaceCollection, MojitoMarketplaceCollection>(
    details,
    marketplaceCollection,
  );
}

function MarketplaceCollectionItemsNormalizer(details: Schema.MarketplaceCollectionItem[]) {
  normalizer_glob_options.content.shortLots = queryClient.getQueryData<{
    [key: string]: ContentfulCollectionItem;
  }>(QueryKey.get(EContentfulKey.shortLots, { mojitoIds: details.map((item) => item.id) }));

  const items = details.map((item) => MarketplaceCollectionItemNormalizer(item));

  return _merge<typeof details, typeof items, MojitoMarketplaceCollectionItem[]>(details, items);
}

function MarketplaceCollectionItemNormalizer(details: Schema.MarketplaceCollectionItem) {
  const lot = queryClient.getQueryData<{ [key: string]: ContentfulCollectionItem }>(
    QueryKey.get(EContentfulKey.fullLot, { mojitoId: details.id }),
  );

  const content =
    lot?.[details.id] ??
    normalizer_glob_options.content.shortLots?.[details.id] ??
    ({
      lotId: -1,
      title: 'NA',
      subtitle: 'NA',
      mojitoId: 'NA',
      slug: 'NA',
    } as ContentfulCollectionItem);

  const item = { ...omit(details, 'lot'), content };

  return _merge<typeof details, typeof item, MojitoMarketplaceCollectionItem>(details, item);
}

function MojitoMarketplaceAuctionBidsNormalizer(details: Schema.MarketplaceAuctionBid[]) {
  const bids = details
    .sort((a, b) => (a.amount > b.amount ? -1 : 1))
    .map((item) => MojitoMarketplaceAuctionBidNormalizer(item));

  return _merge<typeof details, typeof bids, MojitoMarketplaceAuctionBid[]>(details, bids);
}

function MojitoMarketplaceAuctionBidNormalizer(details: Schema.MarketplaceAuctionBid) {
  const bid = {
    ...omit(details, ['marketplaceAuctionLot']),
    userOrganization: details.userOrganization
      ? UserOrganizationNormalizer([details.userOrganization])
      : [],
  };

  return _merge<typeof details, typeof bid, MojitoMarketplaceAuctionBid>(details, bid);
}

function _merge<Schema, Normalized, Result>(raw: Schema, normalized: Normalized) {
  return Object.assign(Array.isArray(normalized) ? [] : {}, raw, normalized) as DeepCompare<
    Combine<Schema, Required<Normalized>>,
    Result
  >;
}
