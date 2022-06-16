var __makeTemplateObject =
  (this && this.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, 'raw', {
        value: raw,
      });
    } else {
      cooked.raw = raw;
    }

    return cooked;
  };

var _a;

import { gql } from 'graphql-request';
import { EContentfulKey } from '../enums/state.enum';
export var contentfulQueries =
  ((_a = {}),
  (_a[EContentfulKey.fullLot] = gql(
    templateObject_1 ||
      (templateObject_1 = __makeTemplateObject(
        [
          '\n    query GetFullLot($mojitoId: String) {\n      lotCollection(where: { mojitoId: $mojitoId }) {\n        items {\n          lotId\n          sys {\n            publishedAt\n          }\n          title\n          subtitle\n          imagesCollection {\n            items {\n              url\n              title\n              contentType\n            }\n          }\n          createdAt\n          estimatePrice\n          purchasedAt\n          smartContractAddress\n          tokenId\n          mojitoId\n          author {\n            about\n            name\n            slug\n            avatar {\n              url\n              title\n            }\n          }\n          collector {\n            name\n            slug\n            about\n            smartContractAddress\n            avatar {\n              url\n              title\n            }\n            videoId\n            twitterLink\n          }\n          aboutLot\n          note\n          history\n          video\n          conditionReportText\n          shortCollectorDescription\n          nftLink\n          slug\n          nftVideoIds\n          lotPreviewBackgroundColor\n          gridPreviewImage {\n            url\n            title\n          }\n        }\n      }\n    }\n  ',
        ],
        [
          '\n    query GetFullLot($mojitoId: String) {\n      lotCollection(where: { mojitoId: $mojitoId }) {\n        items {\n          lotId\n          sys {\n            publishedAt\n          }\n          title\n          subtitle\n          imagesCollection {\n            items {\n              url\n              title\n              contentType\n            }\n          }\n          createdAt\n          estimatePrice\n          purchasedAt\n          smartContractAddress\n          tokenId\n          mojitoId\n          author {\n            about\n            name\n            slug\n            avatar {\n              url\n              title\n            }\n          }\n          collector {\n            name\n            slug\n            about\n            smartContractAddress\n            avatar {\n              url\n              title\n            }\n            videoId\n            twitterLink\n          }\n          aboutLot\n          note\n          history\n          video\n          conditionReportText\n          shortCollectorDescription\n          nftLink\n          slug\n          nftVideoIds\n          lotPreviewBackgroundColor\n          gridPreviewImage {\n            url\n            title\n          }\n        }\n      }\n    }\n  ',
        ],
      )),
  )),
  (_a[EContentfulKey.shortLots] = gql(
    templateObject_2 ||
      (templateObject_2 = __makeTemplateObject(
        [
          '\n    query GetShortLots($mojitoIds: [String]) {\n      lotCollection(order: lotId_ASC, where: { mojitoId_in: $mojitoIds }) {\n        items {\n          sys {\n            publishedAt\n          }\n          lotId\n          title\n          subtitle\n          mojitoId\n          author {\n            name\n            slug\n            avatar {\n              url\n            }\n          }\n          collector {\n            name\n            slug\n            avatar {\n              url\n            }\n          }\n          slug\n          gridPreviewImage {\n            url\n            title\n          }\n          imagesCollection(limit: 1) {\n            items {\n              url\n              title\n            }\n          }\n        }\n      }\n    }\n  ',
        ],
        [
          '\n    query GetShortLots($mojitoIds: [String]) {\n      lotCollection(order: lotId_ASC, where: { mojitoId_in: $mojitoIds }) {\n        items {\n          sys {\n            publishedAt\n          }\n          lotId\n          title\n          subtitle\n          mojitoId\n          author {\n            name\n            slug\n            avatar {\n              url\n            }\n          }\n          collector {\n            name\n            slug\n            avatar {\n              url\n            }\n          }\n          slug\n          gridPreviewImage {\n            url\n            title\n          }\n          imagesCollection(limit: 1) {\n            items {\n              url\n              title\n            }\n          }\n        }\n      }\n    }\n  ',
        ],
      )),
  )),
  (_a[EContentfulKey.auctionBySlug] = gql(
    templateObject_3 ||
      (templateObject_3 = __makeTemplateObject(
        [
          '\n    query GetAuctionBySlug($slug: String) {\n      auctionCollection(order: sys_publishedAt_DESC, where: { slug: $slug }) {\n        items {\n          name\n          title\n          subtitle\n          duration\n          description\n          data\n          startDate\n          endDate\n          videoId\n          slug\n          saleId\n        }\n      }\n    }\n  ',
        ],
        [
          '\n    query GetAuctionBySlug($slug: String) {\n      auctionCollection(order: sys_publishedAt_DESC, where: { slug: $slug }) {\n        items {\n          name\n          title\n          subtitle\n          duration\n          description\n          data\n          startDate\n          endDate\n          videoId\n          slug\n          saleId\n        }\n      }\n    }\n  ',
        ],
      )),
  )),
  (_a[EContentfulKey.auctionsSlugList] = gql(
    templateObject_4 ||
      (templateObject_4 = __makeTemplateObject(
        [
          '\n    query GetAuctionsSlugs {\n      auctionCollection(order: sys_publishedAt_DESC) {\n        items {\n          slug\n        }\n      }\n    }\n  ',
        ],
        [
          '\n    query GetAuctionsSlugs {\n      auctionCollection(order: sys_publishedAt_DESC) {\n        items {\n          slug\n        }\n      }\n    }\n  ',
        ],
      )),
  )),
  (_a[EContentfulKey.collectors] = gql(
    templateObject_5 ||
      (templateObject_5 = __makeTemplateObject(
        [
          '\n    query GetCollectors {\n      collectorCollection(order: name_ASC) {\n        items {\n          sys {\n            publishedAt\n          }\n          name\n          about\n          smartContractAddress\n          linkedFrom {\n            lotCollection {\n              items {\n                mojitoId\n                title\n                slug\n              }\n            }\n          }\n          avatar {\n            url\n            title\n          }\n          videoId\n          twitterLink\n          slug\n        }\n      }\n    }\n  ',
        ],
        [
          '\n    query GetCollectors {\n      collectorCollection(order: name_ASC) {\n        items {\n          sys {\n            publishedAt\n          }\n          name\n          about\n          smartContractAddress\n          linkedFrom {\n            lotCollection {\n              items {\n                mojitoId\n                title\n                slug\n              }\n            }\n          }\n          avatar {\n            url\n            title\n          }\n          videoId\n          twitterLink\n          slug\n        }\n      }\n    }\n  ',
        ],
      )),
  )),
  (_a[EContentfulKey.authors] = gql(
    templateObject_6 ||
      (templateObject_6 = __makeTemplateObject(
        [
          '\n    query GetAuthors {\n      authorCollection {\n        items {\n          sys {\n            publishedAt\n          }\n          about\n          name\n          slug\n          avatar {\n            url\n            title\n          }\n          linkedFrom {\n            lotCollection {\n              items {\n                mojitoId\n                title\n                slug\n              }\n            }\n          }\n        }\n      }\n    }\n  ',
        ],
        [
          '\n    query GetAuthors {\n      authorCollection {\n        items {\n          sys {\n            publishedAt\n          }\n          about\n          name\n          slug\n          avatar {\n            url\n            title\n          }\n          linkedFrom {\n            lotCollection {\n              items {\n                mojitoId\n                title\n                slug\n              }\n            }\n          }\n        }\n      }\n    }\n  ',
        ],
      )),
  )),
  (_a[EContentfulKey.organizations] = gql(
    templateObject_7 ||
      (templateObject_7 = __makeTemplateObject(
        [
          '\n    query GetOrganizations {\n      organizationCollection {\n        items {\n          homepageRedirect {\n            name\n            slug\n          }\n        }\n      }\n    }\n  ',
        ],
        [
          '\n    query GetOrganizations {\n      organizationCollection {\n        items {\n          homepageRedirect {\n            name\n            slug\n          }\n        }\n      }\n    }\n  ',
        ],
      )),
  )),
  _a);
var templateObject_1,
  templateObject_2,
  templateObject_3,
  templateObject_4,
  templateObject_5,
  templateObject_6,
  templateObject_7; // 6267c3d0-bdba-45a2-bcca-6c7ff10fd193
// 6678e79a-ae68-450f-bd7f-21e47bed3e5f
// lotCollection(order: lotId_ASC, where: {OR: [{mojitoId: "6678e79a-ae68-450f-bd7f-21e47bed3e5f"}, {mojitoId: "6267c3d0-bdba-45a2-bcca-6c7ff10fd193"}]}) {
