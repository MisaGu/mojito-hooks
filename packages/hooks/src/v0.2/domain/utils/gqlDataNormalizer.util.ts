import moment from 'moment';
import { config } from '../constants/general.constants';
import { EContentfulQueries } from '../gql/contentful';
import { EMojitoQueries } from '../gql/queries';
import {
  ContentfulAuctionBySlugResponse,
  CurrentUserResponse,
  IContentfulLotData,
  MojitoCurrentUser,
  MojitoMarketplaceCollection,
  MojitoMarketplaceCollectionItem,
  MojitoQuery,
  MojitoWallet,
} from '../interfaces';
import * as Schema from '../interfaces/mojito-schema.interface';
import { Combine, DeepCompare } from '../interfaces/_utils.interface';
import { queryClient } from './gqlRequest.util';
import { QueryKey } from './queryKeyFactory.util';

const extendCollection = (collection: MojitoMarketplaceCollection) => {
  const contentfulData = queryClient.getQueryData<ContentfulAuctionBySlugResponse>(
    QueryKey.get(EContentfulQueries.auctionBySlug, { slug: collection.slug }),
  )?.auctionCollection?.items?.[0];

  const auctionStartUnix = moment(collection.startDate ?? null).unix();
  const auctionEndUnix = moment(collection.endDate ?? null).unix();
  const nowUnix = moment().unix();

  const { items } = collection;
  const totalItems = items.length;

  let i = 0;
  let hasBuyNowItems = false;
  let hasAuctionItems = false;

  while (i < totalItems && !(hasBuyNowItems && hasAuctionItems)) {
    const { saleType } = items[i++];

    if (saleType === Schema.MarketplaceSaleType.BuyNow) {
      hasBuyNowItems = true;
    }

    if (saleType === Schema.MarketplaceSaleType.Auction) {
      hasAuctionItems = true;
    }
  }

  const isPreSale = nowUnix < auctionStartUnix;
  const isDuringSale = nowUnix > auctionStartUnix && nowUnix < auctionEndUnix;
  const isPostSale = nowUnix > auctionEndUnix;

  Object.assign(collection, {
    contentfulData,
    isFake: !contentfulData,
    viewStatus: {
      isPreSale,
      isDuringSale,
      isPostSale,
      hasActiveBuyNowItems: isDuringSale && hasBuyNowItems,
      hasActiveAuctionItems: isDuringSale && hasAuctionItems,
    },
  });

  if (collection?.items?.length) {
    collection.items = extendCollectionItems(collection.items, collection.slug);
    collection.hasMultipleLots = collection.items.length > 1;
  }

  return collection;
};

const extendCollectionSingleItem = (
  item: any,
  slug: string,
  shortLots?: {
    [key: string]: IContentfulLotData;
  },
) => {
  const _item = item as MojitoMarketplaceCollectionItem<Schema.MarketplaceSaleType.Auction>;

  const __itemAsBuyNow = item as MojitoMarketplaceCollectionItem<Schema.MarketplaceSaleType.BuyNow>;

  if (__itemAsBuyNow?.details?.remainingCount < 0) {
    __itemAsBuyNow.details.remainingCount = 0;
  }

  if (!_item?.details?.bids && !_item?.details?.currentBid) {
    const lot = queryClient.getQueryData<{ [key: string]: IContentfulLotData }>(
      QueryKey.get(EContentfulQueries.fullLot, { mojitoId: item.id }),
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
      } as IContentfulLotData);
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
    [key: string]: IContentfulLotData;
  }>(QueryKey.get(EContentfulQueries.shortLots, { slug }));

  return collectionItems.map((item) => extendCollectionSingleItem(item, slug, lots));
};

const extendItemDetails = (details: any, slug: string) => {
  const profile = queryClient.getQueryData<CurrentUserResponse>(
    QueryKey.get(EMojitoQueries.profile),
  )?.me;

  const item = queryClient
    .getQueryData<{ items }>(
      QueryKey.get(EMojitoQueries.collectionBySlugCurrentBids, {
        slug,
        marketplaceID: config.MARKETPLACE_ID,
      }),
    )
    ?.items?.find((e) => e.details.id === details.id);

  const oldDetails = item?.details;

  if (details.startDate && details.endDate) {
    const auctionStartUnix = moment(details.startDate ?? null).unix();
    const auctionEndUnix = moment(details.endDate ?? null).unix();
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

export function mojitoNormalizer(
  response: Schema.Query,
  variables?: { slug?: string },
  key?: any,
): any {
  if (!response) return null;
  const normalizedResponse = {};

  if (response.serverTime) {
    Object.assign(normalizedResponse, { serverTime: ServerTimeNormalizer(response.serverTime) });
  }

  if (response.me) {
    var user = CurrentUserNormalizer(response.me);
    // user?.wallets?.[0]?.tokens?.[0]?.walletId;

    Object.assign(normalizedResponse, { me: user });
  }

  if (response?.me?.userOrgs?.[0]) {
    const _organization = response.me.userOrgs[0];

    const role = _organization.role;
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

    Object.assign(_organization, {
      notifications: {
        completeYourProfile,
        uploadID,
        contactUs,
      },
      hasNotifications: !!(completeYourProfile || uploadID || contactUs),
      settings: _organization.settings
        ? JSON.parse(_organization.settings)
        : {
            hasCompletedOnboarding: false,
            notifications: {
              bidOnSold: false,
              savedBidOn: false,
              savedSold: false,
            },
            privacy: {
              hideActivity: false,
              showCollection: false,
              showSaved: false,
            },
          },
    });
    response.me.userOrgs[0] = _organization;
  }

  if (response?.getMarketplaceAuctionLot) {
    response.getMarketplaceAuctionLot = extendItemDetails(
      response.getMarketplaceAuctionLot,
      variables?.slug as string,
    );
  }

  if (response?.collection?.items) {
    // @ts-ignore
    response.collection = extendCollection(response.collection);
  }

  if (response?.collectionBySlug?.items) {
    // @ts-ignore
    Object.assign(response, extendCollection(response.collectionBySlug));
    delete response.collectionBySlug;
  }

  if (response?.collectionItemById) {
    if (variables?.slug) {
      response.collectionItemById = extendCollectionSingleItem(
        response.collectionItemById,
        variables.slug,
      );
    }
    Object.assign(response, response.collectionItemById);
  }

  if (response?.marketplace?.collections) {
    // @ts-ignore
    response.marketplace.collections = response?.marketplace?.collections.map((collection: any) =>
      extendCollection(collection),
    );
  }

  if (response?.getMyInvoices) {
    const lots = queryClient.getQueryData<{
      [key: string]: IContentfulLotData;
    }>(QueryKey.get(EContentfulQueries.shortLots, { slug: variables?.slug }));

    // _data.getMyInvoices = _data?.getMyInvoices.map((invoice) => {
    //   const lot = lots?.[invoice.collectionItemId];

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
    const _items = _data?.lotCollection?.items as IContentfulLotData[];

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
    wallets: details.wallets ? CurrentUserWalletsNormalizer(details.wallets) : [],
    wonBids: null, //TODO
    activeBids: null, //TODO
    userOrgs: null, //TODO
    favoriteItems: null, //TODO
  };

  return _merge<typeof details, typeof me, MojitoCurrentUser>(details, me);
}

function CurrentUserWalletsNormalizer(details: Schema.Wallet[]) {
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

function _merge<Schema, Normalized, Result>(raw: Schema, normalized: Normalized) {
  return Object.assign(Array.isArray(normalized) ? [] : {}, raw, normalized) as DeepCompare<
    Combine<Schema, Required<Normalized>>,
    Result
  >;
}
