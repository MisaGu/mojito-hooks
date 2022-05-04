import { config } from '@constants';
import { IContentfulAuctionsQuery, IContentfulLotData } from '@interfaces/contentful.interface';
import {
  ICollectionItemByIdBidsList,
  IIMojitoCollectionItemCurrentBidsItems,
  IMojitoCollection,
  IMojitoCollectionItem,
  IMojitoCollectionItemBuyNowLot,
  IMojitoCollectionItemCurrentBids,
  IMojitoInvoiceDetailsItem,
  IMojitoProfileRequest,
  IMojitoWallet,
} from '@interfaces/mojito.interface';
import { EContentfulQueries } from 'data/graph_ql/contentful.query';
import { EMojitoQueries } from 'data/graph_ql/mojito.query';
import moment from 'moment';
import { queryClient } from './gqlRequest.util';

type ILotBidsOrCurrentBid = IMojitoCollectionItemCurrentBids & ICollectionItemByIdBidsList;

const extendCollection = (
  collection: IMojitoCollection & IIMojitoCollectionItemCurrentBidsItems,
) => {
  const contentfulData = queryClient.getQueryData<IContentfulAuctionsQuery>([
    `Contentful ${EContentfulQueries[EContentfulQueries.auctionBySlug]}`,
    { slug: collection.slug },
  ])?.auctionCollection?.items?.[0];

  if (contentfulData) {
    collection.contentfulData = contentfulData;
  }

  const auctionStartUnix = moment(collection.startDate ?? null).unix();
  const auctionEndUnix = moment(collection.endDate ?? null).unix();
  const nowUnix = moment().unix();

  Object.assign(collection, {
    viewStatus: {
      isPreSale: nowUnix < auctionStartUnix,
      isDuringSale: nowUnix > auctionStartUnix && nowUnix < auctionEndUnix,
      isPostSale: nowUnix > auctionEndUnix,
    },
  });

  if (collection?.items?.length) {
    collection.items = extendCollectionItems(collection.items, collection.slug);
    collection.hasMultipleLots = collection.items.length > 1;
  }

  return collection;
};

const extendCollectionSingleItem = (
  item: IMojitoCollectionItem | ILotBidsOrCurrentBid,
  slug: string,
  shortLots?: {
    [key: string]: IContentfulLotData;
  },
) => {
  const _item = item as IMojitoCollectionItemCurrentBids & ICollectionItemByIdBidsList;

  const __itemAsBuyNow = item as IMojitoCollectionItem<IMojitoCollectionItemBuyNowLot>;
  if (__itemAsBuyNow?.details?.remainingCount < 0) {
    __itemAsBuyNow.details.remainingCount = 0;
  }

  if (!_item?.details?.bids && !_item?.details?.currentBid) {
    const lot = queryClient.getQueryData<{ [key: string]: IContentfulLotData }>([
      `Contentful ${EContentfulQueries[EContentfulQueries.fullLot]}`,
      { mojitoId: item.id },
    ]);

    (item as IMojitoCollectionItem).contentfulData =
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
    item.details = extendItemDetails(item.details as ILotBidsOrCurrentBid['details'], slug);
  }

  return item as IMojitoCollectionItem & IMojitoCollectionItemCurrentBids;
};

const extendCollectionItems = (
  collectionItems: IMojitoCollectionItem[] & IMojitoCollectionItemCurrentBids[],
  slug: string,
) => {
  const lots = queryClient.getQueryData<{
    [key: string]: IContentfulLotData;
  }>([`Contentful ${EContentfulQueries[EContentfulQueries.shortLots]}`, { slug }]);

  return collectionItems.map((item) => extendCollectionSingleItem(item, slug, lots));
};

const extendItemDetails = (details: ILotBidsOrCurrentBid['details'], slug: string) => {
  const profile = queryClient.getQueryData<IMojitoProfileRequest>([
    `Mojito ${EMojitoQueries[EMojitoQueries.profile]}`,
    null,
  ])?.me;
  const item = queryClient
    .getQueryData<{ items: IMojitoCollectionItemCurrentBids[] }>([
      `Mojito ${EMojitoQueries[EMojitoQueries.collectionBySlugCurrentBids]}`,
      {
        slug,
        marketplaceID: config.MARKETPLACE_ID,
      },
    ])
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
    } as ILotBidsOrCurrentBid['details']['currentBid'];
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

export function mojitoNormalizer(response: any, variables?: { slug?: string }, key?: any): any {
  if (!response) return null;
  const _data = response;

  if (_data.serverTime) {
    const serverTimeOffset = new Date(_data.serverTime).getTime() - Date.now();

    moment.now = function () {
      return serverTimeOffset + Date.now();
    };
  }
  if (_data?.me?.userOrgs?.[0]) {
    const _organization = _data.me.userOrgs[0];

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

    // console.log(_organization.settings);

    Object.assign(_organization, {
      notifications: {
        isTransactionalWithID,
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
    _data.me.userOrgs[0] = _organization;
  }

  if (_data?.getMarketplaceAuctionLot) {
    _data.getMarketplaceAuctionLot = extendItemDetails(
      _data.getMarketplaceAuctionLot,
      variables?.slug as string,
    );
  }

  if (_data?.collection?.items) {
    _data.collection = extendCollection(_data.collection);
  }

  if (_data?.collectionBySlug?.items) {
    Object.assign(_data, extendCollection(_data.collectionBySlug));
    delete _data.collectionBySlug;
  }

  if (_data?.collectionItemById) {
    if (variables?.slug) {
      _data.collectionItemById = extendCollectionSingleItem(
        _data.collectionItemById,
        variables.slug,
      );
    }
    Object.assign(_data, _data.collectionItemById);
  }

  // TODO replace the mojito marketplace request to multiple collectionBySlug requests
  if (_data?.marketplace?.collections) {
    _data.marketplace.collections = _data?.marketplace?.collections.map((collection: any) =>
      extendCollection(collection),
    );
  }

  if (_data?.me?.wallets) {
    const _wallets = (_data?.me?.wallets as IMojitoWallet[])?.map((wallet) => {
      wallet.tokens = wallet.tokens?.map((token) => Object.assign(token, { walletId: wallet.id }));

      return wallet;
    });

    _data.me.wallets = _wallets;
  }

  if (_data?.getMyInvoices) {
    const lots = queryClient.getQueryData<{
      [key: string]: IContentfulLotData;
    }>([
      `Contentful ${EContentfulQueries[EContentfulQueries.shortLots]}`,
      { slug: variables?.slug },
    ]);

    _data.getMyInvoices = _data?.getMyInvoices.map((invoice: IMojitoInvoiceDetailsItem) => {
      const lot = lots?.[invoice.collectionItemId];

      if (lot) {
        invoice.contentfulData = lot;
      }

      return invoice;
    });
  }

  return _data;
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
