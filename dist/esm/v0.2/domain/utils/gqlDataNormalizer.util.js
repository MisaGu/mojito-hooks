var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
        }

        return t;
      };

    return __assign.apply(this, arguments);
  };

var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }

      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }

      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }

      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };

var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function sent() {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2),
      }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );

    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }

    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');

      while (_) {
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];

          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;

            case 4:
              _.label++;
              return {
                value: op[1],
                done: false,
              };

            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;

            case 7:
              op = _.ops.pop();

              _.trys.pop();

              continue;

            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }

              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }

              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }

              if (t && _.label < t[2]) {
                _.label = t[2];

                _.ops.push(op);

                break;
              }

              if (t[2]) _.ops.pop();

              _.trys.pop();

              continue;
          }

          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      }

      if (op[0] & 5) throw op[1];
      return {
        value: op[0] ? op[1] : void 0,
        done: true,
      };
    }
  };

import moment from 'moment';
import { config } from '../constants/general.constants';
import { EContentfulKey, EMojitoKey } from '../enums/state.enum';
import * as Schema from '../interfaces/mojito-schema.interface';
import { queryClient } from './gqlRequest.util';
import { QueryKey } from './queryKeyFactory.util';
import omit from 'lodash.omit';

var extendCollectionSingleItem = function extendCollectionSingleItem(item, slug, shortLots) {
  var _a, _b, _c, _d, _e;

  var _item = item;
  var __itemAsBuyNow = item;

  if (
    ((_a =
      __itemAsBuyNow === null || __itemAsBuyNow === void 0 ? void 0 : __itemAsBuyNow.details) ===
      null || _a === void 0
      ? void 0
      : _a.remainingCount) < 0
  ) {
    __itemAsBuyNow.details.remainingCount = 0;
  }

  if (
    !((_b = _item === null || _item === void 0 ? void 0 : _item.details) === null || _b === void 0
      ? void 0
      : _b.bids) &&
    !((_c = _item === null || _item === void 0 ? void 0 : _item.details) === null || _c === void 0
      ? void 0
      : _c.currentBid)
  ) {
    var lot = queryClient.getQueryData(
      QueryKey.get(EContentfulKey.fullLot, {
        mojitoId: item.id,
      }),
    );
    item.content =
      (_e =
        (_d = lot === null || lot === void 0 ? void 0 : lot[item.id]) !== null && _d !== void 0
          ? _d
          : shortLots === null || shortLots === void 0
          ? void 0
          : shortLots[item.id]) !== null && _e !== void 0
        ? _e
        : {
            lotId: -1,
            title: 'NA',
            subtitle: 'NA',
            mojitoId: 'NA',
            slug: 'NA',
          };
  }

  if (item === null || item === void 0 ? void 0 : item.details) {
    item.details = extendItemDetails(item.details, slug);
  }

  return item;
};

var extendCollectionItems = function extendCollectionItems(collectionItems, slug) {
  var lots = queryClient.getQueryData(
    QueryKey.get(EContentfulKey.shortLots, {
      slug: slug,
    }),
  );
  return collectionItems.map(function (item) {
    return extendCollectionSingleItem(item, slug, lots);
  });
};

var extendItemDetails = function extendItemDetails(details, slug) {
  var _a, _b, _c, _d, _e, _f, _g, _h;

  var profile =
    (_a = queryClient.getQueryData(QueryKey.get(EMojitoKey.profile))) === null || _a === void 0
      ? void 0
      : _a.me;
  var item =
    (_c =
      (_b = queryClient.getQueryData(
        QueryKey.get(EMojitoKey.collectionBySlugCurrentBids, {
          slug: slug,
          marketplaceID: config.MARKETPLACE_ID,
        }),
      )) === null || _b === void 0
        ? void 0
        : _b.items) === null || _c === void 0
      ? void 0
      : _c.find(function (e) {
          return e.details.id === details.id;
        });
  var oldDetails = item === null || item === void 0 ? void 0 : item.details;

  if (details.startDate && details.endDate) {
    var auctionStartUnix = moment(
      (_d = details.startDate) !== null && _d !== void 0 ? _d : null,
    ).unix();
    var auctionEndUnix = moment(
      (_e = details.endDate) !== null && _e !== void 0 ? _e : null,
    ).unix();
    var nowUnix = moment().unix();
    Object.assign(details, {
      endTimestamp: auctionEndUnix - nowUnix,
      saleView: {
        isPreSale: nowUnix <= auctionStartUnix,
        isDuringSale: nowUnix > auctionStartUnix && nowUnix < auctionEndUnix,
        isPostSale: nowUnix >= auctionEndUnix,
      },
    });
  } // @ts-ignore

  if (details === null || details === void 0 ? void 0 : details.bids) {
    var _bids = details.bids;
    _bids =
      _bids === null || _bids === void 0
        ? void 0
        : _bids.sort(function (a, b) {
            return a.amount > b.amount ? -1 : 1;
          });

    if (profile) {
      var _youFirstBidIndex_1 = -1;

      _bids = _bids.map(function (bid, idx) {
        bid.isMine = profile.id === bid.marketplaceUser.id;

        if (_youFirstBidIndex_1 == -1 && bid.isMine) {
          _youFirstBidIndex_1 = idx;
        }

        return bid;
      });

      if (_youFirstBidIndex_1 == 0) {
        _bids[0].isHold = true;
      } else if (_youFirstBidIndex_1 > 0) {
        _bids[_youFirstBidIndex_1].isOutbid = true;

        if (_bids[0].amount == _bids[_youFirstBidIndex_1].amount) {
          _bids[_youFirstBidIndex_1].isInfo = true;
        }
      }
    }

    Object.assign(details, {
      bids: _bids,
    });
  }

  if (details.currentBid) {
    var _userBid = details.myBid;
    var _currentBid = details.currentBid;

    var _userHoldBid =
      (_userBid === null || _userBid === void 0 ? void 0 : _userBid.id) ==
      (_currentBid === null || _currentBid === void 0 ? void 0 : _currentBid.id);

    if ((_f = details.saleView) === null || _f === void 0 ? void 0 : _f.isDuringSale) {
      if (_userHoldBid) details.currentBid.isHold = true;
      else if (_userBid) details.currentBid.isOutbid = true;
      else details.currentBid.isCurrent = true;
    } else if ((_g = details.saleView) === null || _g === void 0 ? void 0 : _g.isPostSale) {
      if (_userBid && _userHoldBid) details.currentBid.isWin = true;
      else if (_userBid) details.currentBid.isLost = true;
      else details.currentBid.isSold = true;
    }
  } else if (oldDetails === null || oldDetails === void 0 ? void 0 : oldDetails.currentBid) {
    details.currentBid =
      oldDetails === null || oldDetails === void 0 ? void 0 : oldDetails.currentBid;
  } else if ((details === null || details === void 0 ? void 0 : details.currentBid) === null) {
    details.currentBid = {
      amount: (_h = details.startingBid) !== null && _h !== void 0 ? _h : 50,
      isStart: true,
      marketplaceAuctionLotId: details.id,
    };
  } else {
    details.currentBid = null;
  }

  Object.assign(details, {
    currentBid: details.currentBid,
  });

  if (
    !(details === null || details === void 0 ? void 0 : details.myBid) &&
    (oldDetails === null || oldDetails === void 0 ? void 0 : oldDetails.myBid)
  ) {
    Object.assign(details, {
      myBid: oldDetails.myBid,
    });
  }

  return details;
};

export function mojitoNormalizer(raw_response, variables, key) {
  var _a;

  return __awaiter(this, void 0, void 0, function () {
    var normalizedResponse, lots;
    return __generator(this, function (_b) {
      if (!raw_response)
        return [
          2,
          /*return*/
          null,
        ];
      normalizedResponse = {};

      if (raw_response.serverTime) {
        Object.assign(normalizedResponse, {
          serverTime: ServerTimeNormalizer(raw_response.serverTime),
        });
      }

      if (raw_response.me) {
        Object.assign(normalizedResponse, {
          me: CurrentUserNormalizer(raw_response.me),
        });
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

      if ((_a = raw_response.marketplace) === null || _a === void 0 ? void 0 : _a.collections) {
        Object.assign(normalizedResponse, {
          marketplace: {
            collections: raw_response.marketplace.collections.map(function (collection) {
              return MarketplaceCollectionNormalizer(collection);
            }),
          },
        });
      }

      if (
        raw_response === null || raw_response === void 0
          ? void 0
          : raw_response.getMarketplaceAuctionLot
      ) {
        raw_response.getMarketplaceAuctionLot = extendItemDetails(
          raw_response.getMarketplaceAuctionLot,
          variables === null || variables === void 0 ? void 0 : variables.slug,
        );
      }

      if (
        raw_response === null || raw_response === void 0 ? void 0 : raw_response.collectionItemById
      ) {
        if (variables === null || variables === void 0 ? void 0 : variables.slug) {
          raw_response.collectionItemById = extendCollectionSingleItem(
            raw_response.collectionItemById,
            variables.slug,
          );
        }

        Object.assign(raw_response, raw_response.collectionItemById);
      }

      if (raw_response === null || raw_response === void 0 ? void 0 : raw_response.getMyInvoices) {
        lots = queryClient.getQueryData(
          QueryKey.get(EContentfulKey.shortLots, {
            slug: variables === null || variables === void 0 ? void 0 : variables.slug,
          }),
        ); // _data.getMyInvoices = _data?.getMyInvoices.map((invoice) => {
        //   const lot = lots?.[invoice.collectionItemID];
        //   if (lot) {
        //     invoice.contentfulData = lot;
        //   }
        //   return invoice;
        // });
      }

      return [
        2,
        /*return*/
        normalizedResponse,
      ];
    });
  });
}
export function contentfulNormalizer(response, variables, key) {
  var _a, _b;

  if (!response) return null;
  var _data = response;

  if (
    (_a = _data === null || _data === void 0 ? void 0 : _data.lotCollection) === null ||
    _a === void 0
      ? void 0
      : _a.items
  ) {
    var _items =
      (_b = _data === null || _data === void 0 ? void 0 : _data.lotCollection) === null ||
      _b === void 0
        ? void 0
        : _b.items;

    return _items.reduce(function (acc, item) {
      var _a;

      return Object.assign(acc, ((_a = {}), (_a[item.mojitoId] = item), _a));
    }, {});
  }

  return response;
} // =================================================== NEW ===================================================

function ServerTimeNormalizer(details) {
  var serverTime = new Date(details);
  var serverTimeOffset = serverTime.getTime() - Date.now();

  moment.now = function () {
    return serverTimeOffset + Date.now();
  };

  return serverTime;
}

function CurrentUserNormalizer(details) {
  var me = __assign(__assign({}, details), {
    wallets: details.wallets ? WalletsNormalizer(details.wallets) : [],
    wonBids: null,
    activeBids: null,
    userOrgs: details.userOrgs ? UserOrganizationNormalizer(details.userOrgs) : [],
    favoriteItems: null,
  });

  return _merge(details, me);
}

function WalletsNormalizer(details) {
  var wallets = details.map(function (wallet) {
    return Object.assign(wallet, WalletItemNormalizer(wallet));
  });
  return _merge(details, wallets);
}

function WalletItemNormalizer(details) {
  var wallet = __assign(__assign({}, details), {
    tokens: details.tokens
      ? details.tokens.map(function (token) {
          return Object.assign(token, {
            walletId: details.id,
          });
        })
      : [],
  });

  return _merge(details, wallet);
}

function UserOrganizationNormalizer(details) {
  var userOrs = details.map(function (organization) {
    var role = organization.role;
    var isBasic = role === 'Basic';
    var isMissingInfo = role === 'MissingInformation';
    var isEndUser = role === 'EndUser';
    var isTransactionalNoID = role === 'TransactionalNoID';
    var isTransactionalWithID = role === 'TransactionalWithID';
    var isNotAllowedToBid = role === 'NotAllowedToBid';
    var isCoreUnavailable = role === 'CoreUnavailable';
    var isBidAuthUnavailable = role === 'BidAuthUnavailable';
    var completeYourProfile = isBasic || isMissingInfo || isEndUser;
    var uploadID = isTransactionalNoID;
    var contactUs = isNotAllowedToBid || isCoreUnavailable || isBidAuthUnavailable;
    return __assign(__assign({}, omit(organization, ['user', 'organization'])), {
      notifications: {
        isTransactionalWithID: isTransactionalWithID,
        completeYourProfile: completeYourProfile,
        uploadID: uploadID,
        contactUs: contactUs,
      },
      hasNotifications: !!(completeYourProfile || uploadID || contactUs),
      settings: organization.settings
        ? JSON.parse(organization.settings)
        : {
            hasCompletedOnboarding: false,
          },
    });
  });
  return _merge(details, userOrs);
}

function OrganizationNormalizer(details) {
  var organization = __assign(__assign({}, omit(details, ['marketplaces'])), {
    wallets: details.wallets ? WalletsNormalizer(details.wallets) : [],
    assets: [],
    nftContracts: [],
  });

  return _merge(details, organization);
}

function MarketplaceCollectionNormalizer(details) {
  var _a, _b, _c, _d, _e;

  var content =
    (_c =
      (_b =
        (_a = queryClient.getQueryData(
          QueryKey.get(EContentfulKey.auctionBySlug, {
            slug: details.slug,
          }),
        )) === null || _a === void 0
          ? void 0
          : _a.auctionCollection) === null || _b === void 0
        ? void 0
        : _b.items) === null || _c === void 0
      ? void 0
      : _c[0];
  var auctionStartUnix = moment(
    (_d = details.startDate) !== null && _d !== void 0 ? _d : null,
  ).unix();
  var auctionEndUnix = moment((_e = details.endDate) !== null && _e !== void 0 ? _e : null).unix();
  var nowUnix = moment().unix();
  var itemsFilterStatus = {
    hasBuyNowItems: false,
    hasAuctionItems: false,
    hasClaimableItems: false,
  };

  if (details.items) {
    for (var i = 0; i < details.items.length; i++) {
      var saleType = details.items[i].saleType;

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

  var marketplaceCollection = __assign(
    __assign(
      __assign(__assign({}, details), {
        content: content,
        items: details.items ? MarketplaceCollectionItemsNormalizer(details.items) : [],
      }),
      itemsFilterStatus,
    ),
    {
      saleStatus: {
        isPreSale: nowUnix < auctionStartUnix,
        isDuringSale: nowUnix > auctionStartUnix && nowUnix < auctionEndUnix,
        isPostSale: nowUnix > auctionEndUnix,
      },
    },
  );

  return _merge(details, marketplaceCollection);
}

function MarketplaceCollectionItemsNormalizer(details) {
  var items = details.map(function (item) {
    return __assign({}, omit(item, 'lot'));
  });
  return _merge(details, items);
}

function _merge(raw, normalized) {
  return Object.assign(Array.isArray(normalized) ? [] : {}, raw, normalized);
}
