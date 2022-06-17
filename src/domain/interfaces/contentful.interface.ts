export type ContentfulAuctionBySlugResponse = {
  auctionCollection: {
    items: ContentfulAuction[];
  };
};

export type ContentfulLotsQuery = {
  lotCollection: {
    items: ContentfulCollectionItem[];
  };
};

export type ContentfulLotByIDQuery = {
  data: any;
};

export type ContentfulCollectorsQuery = {
  collectorCollection: {
    items: ContentfulCollector[];
  };
};

export type ContentfulAuthorsQuery = {
  authorCollection: {
    items: ContentfulAuthor[];
  };
};

export type ContentfulAuctionsSlugListQuery = {
  auctionCollection: {
    items: { slug: string }[];
  };
};

// --------------------------------------------- OLD -------------------------------- //

export type ContentfulAuction = {
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
};

export type ContentfulCollectionItem = {
  lotId: number;
  mojitoId: string;
  sys: {
    publishedAt: string;
  };
  title: string;
  subtitle: string | null;
  imagesCollection: {
    items: ContentfulImageItem[];
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
};
export type ContentfulCollector = {
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
};

export type ContentfulAuthor = {
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
};

type _auctionData = { [key: string]: string | number | any[] | _auctionData };

export type ContentfulCollection = {
  sys: {
    publishedAt: string;
  };
  description: string;
  duration: string;
  startDate: string;
  endDate: string;
  lotsCollection: {
    items: ContentfulCollectionItem[];
  };
  name: string;
  title: string;
  subtitle: string;
  videoId: string;
  slug: string;
  saleId: string;
  data: _auctionData;
};

export type ContentfulImageItem = {
  url: string;
  title: string;
  contentType: string;
};

export type ContentfulOrganization = {
  homepageRedirect: {
    name: string;
    slug: string;
  };
};

export type ContentfulOrganizationQuery = {
  organizationCollection: {
    items: ContentfulOrganization[];
  };
};
