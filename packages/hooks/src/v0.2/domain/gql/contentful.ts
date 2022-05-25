import { gql } from 'graphql-request';

export enum EContentfulQueries {
  fullLot = 'fullLot',
  shortLots = 'shortLots',
  auctionBySlug = 'auctionBySlug',
  auctionsSlugList = 'auctionsSlugList',
  collectors = 'collectors',
  authors = 'authors',
  organizations = 'organizations',
}

export const contentfulQueries: Record<EContentfulQueries, string> = {
  [EContentfulQueries.fullLot]: gql`
    query GetFullLot($mojitoId: String) {
      lotCollection(where: { mojitoId: $mojitoId }) {
        items {
          lotId
          sys {
            publishedAt
          }
          title
          subtitle
          imagesCollection {
            items {
              url
              title
              contentType
            }
          }
          createdAt
          estimatePrice
          purchasedAt
          smartContractAddress
          tokenId
          mojitoId
          author {
            about
            name
            slug
            avatar {
              url
              title
            }
          }
          collector {
            name
            slug
            about
            smartContractAddress
            avatar {
              url
              title
            }
            videoId
            twitterLink
          }
          aboutLot
          note
          history
          video
          conditionReportText
          shortCollectorDescription
          nftLink
          slug
          nftVideoIds
          lotPreviewBackgroundColor
          gridPreviewImage {
            url
            title
          }
        }
      }
    }
  `,
  [EContentfulQueries.shortLots]: gql`
    query GetShortLots($mojitoIds: [String]) {
      lotCollection(order: lotId_ASC, where: { mojitoId_in: $mojitoIds }) {
        items {
          sys {
            publishedAt
          }
          lotId
          title
          subtitle
          mojitoId
          author {
            name
            slug
            avatar {
              url
            }
          }
          collector {
            name
            slug
            avatar {
              url
            }
          }
          slug
          gridPreviewImage {
            url
            title
          }
          imagesCollection(limit: 1) {
            items {
              url
              title
            }
          }
        }
      }
    }
  `,
  [EContentfulQueries.auctionBySlug]: gql`
    query GetAuctionBySlug($slug: String) {
      auctionCollection(order: sys_publishedAt_DESC, where: { slug: $slug }) {
        items {
          name
          title
          subtitle
          duration
          description
          data
          startDate
          endDate
          videoId
          slug
          saleId
        }
      }
    }
  `,
  [EContentfulQueries.auctionsSlugList]: gql`
    query GetAuctionsSlugs {
      auctionCollection(order: sys_publishedAt_DESC) {
        items {
          slug
        }
      }
    }
  `,
  [EContentfulQueries.collectors]: gql`
    query GetCollectors {
      collectorCollection(order: name_ASC) {
        items {
          sys {
            publishedAt
          }
          name
          about
          smartContractAddress
          linkedFrom {
            lotCollection {
              items {
                mojitoId
                title
                slug
              }
            }
          }
          avatar {
            url
            title
          }
          videoId
          twitterLink
          slug
        }
      }
    }
  `,
  [EContentfulQueries.authors]: gql`
    query GetAuthors {
      authorCollection {
        items {
          sys {
            publishedAt
          }
          about
          name
          slug
          avatar {
            url
            title
          }
          linkedFrom {
            lotCollection {
              items {
                mojitoId
                title
                slug
              }
            }
          }
        }
      }
    }
  `,
  [EContentfulQueries.organizations]: gql`
    query GetOrganizations {
      organizationCollection {
        items {
          homepageRedirect {
            name
            slug
          }
        }
      }
    }
  `,
};

// 6267c3d0-bdba-45a2-bcca-6c7ff10fd193
// 6678e79a-ae68-450f-bd7f-21e47bed3e5f
// lotCollection(order: lotId_ASC, where: {OR: [{mojitoId: "6678e79a-ae68-450f-bd7f-21e47bed3e5f"}, {mojitoId: "6267c3d0-bdba-45a2-bcca-6c7ff10fd193"}]}) {
