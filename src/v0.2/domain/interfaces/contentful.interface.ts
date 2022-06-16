export interface ContentfulAuctionBySlugResponse {
  auctionCollection: {
    items: ContentfulAuction[];
  };
}

export interface IContentfulLotsQuery {
  lotCollection: {
    items: IContentfulCollectionItem[];
  };
}

export interface IContentfulLotByIDQuery {
  data: any;
}

export interface IContentfulCollectorsQuery {
  collectorCollection: {
    items: IContentfulCollector[];
  };
}

export interface IContentfulAuthorsQuery {
  authorCollection: {
    items: IContentfulAuthor[];
  };
}

export interface IContentfulAuctionsSlugListQuery {
  auctionCollection: {
    items: { slug: string }[];
  };
}

// --------------------------------------------- OLD -------------------------------- //

export interface ContentfulAuction {
  name: string;
  title: string;
  subtitle: string;
  duration: string;
  description: string;
  data: _auctionData;
  startDate: string;
  endDate: string;
  videoId: string;
  slug: string;
  saleId: string;
}

export interface IContentfulCollectionItem {
  lotId: number;
  mojitoId: string;
  sys: {
    publishedAt: string;
  };
  title: string;
  subtitle: string | null;
  imagesCollection: {
    items: IContentfulImageItem[];
  };
  author: {
    name: string;
    about: string;
    avatar: {
      url: string;
      title: string;
    };
    slug: string;
  };
  createdAt: string;
  estimatePrice: string | null;
  purchasedAt: string;
  smartContractAddress: string;
  tokenId: string;
  collector: {
    name: string;
    about: string;
    avatar: {
      title: string;
      url: string;
    };
    smartContractAddress: string;
    videoId: string | null;
    twitterLink: string;
    slug: string;
  };
  aboutLot: string;
  note: string | null;
  history: {
    buyerName: string;
    date: string;
    price: string;
    smartContractAddress: string;
  }[];
  video: string | null;
  conditionReportText: string | null;
  shortCollectorDescription: string | null;
  slug: string;
  nftLink: string | null;
  nftVideoIds: string[];
  mojitoLotData?: any;
  lotPreviewBackgroundColor: string | null;
  gridPreviewImage: {
    url: string;
    title: string;
  } | null;
}
export interface IContentfulCollector {
  sys: {
    publishedAt: string;
  };
  name: string;
  about: string;
  avatar: {
    title: string;
    url: string;
  };
  smartContractAddress: string;
  linkedFrom: {
    lotCollection: {
      items: {
        mojitoId: string;
        title: string;
        slug: string;
      }[];
    };
  };
  videoId: string | null;
  twitterLink: string;
  slug: string;
}
export interface IContentfulAuthor {
  sys: {
    publishedAt: string;
  };
  name: string;
  about: string;
  avatar: {
    title: string;
    url: string;
  };
  linkedFrom: {
    lotCollection: {
      items: {
        mojitoId: string;
        title: string;
        slug: string;
      }[];
    };
  };
  slug: string;
}

type _auctionData = { [key: string]: string | number | any[] | _auctionData };

export interface IContentfulCollection {
  sys: {
    publishedAt: string;
  };
  description: string;
  duration: string;
  startDate: string;
  endDate: string;
  lotsCollection: {
    items: IContentfulCollectionItem[];
  };
  name: string;
  title: string;
  subtitle: string;
  videoId: string;
  slug: string;
  saleId: string;
  data: _auctionData;
}

export interface IContentfulImageItem {
  url: string;
  title: string;
  contentType: string;
}

export interface IContentfulOrganization {
  homepageRedirect: {
    name: string;
    slug: string;
  };
}

export interface IContentfulOrganizationQuery {
  organizationCollection: {
    items: IContentfulOrganization[];
  };
}