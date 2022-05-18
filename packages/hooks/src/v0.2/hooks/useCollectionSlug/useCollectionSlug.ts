import { config } from '../../domain/constants/general.constants';
import { IMojitoMarketplaceResponse } from '../../domain/interfaces';
import { getAuctionSlug } from '../../domain/utils/path.util';
import { EMojitoQueries } from '../../domain/gql/queries';
import { QueryResult } from '../../domain/utils/gql.utils';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';
import { BaseHookPropsWithUrlAndSlug } from '../../domain/interfaces/hooks.interface';

export type UseCollectionSlugData = string | null | undefined;

export type UseCollectionSlugReturn = QueryResult<'slug', UseCollectionSlugData>;

export type UseCollectionSlugProps = BaseHookPropsWithUrlAndSlug<UseCollectionSlugData>;
// export type UseCollectionSlugProps = BaseHookPropsWithUrlAndSlug<IMojitoMarketplaceResponse>;

// TODO: Memo this function:

function checkCollectionSlugExists(
  auctionSlug: string,
  mojitoCollections?: IMojitoMarketplaceResponse,
): UseCollectionSlugData {
  if (!mojitoCollections) return undefined;

  const mojitoCollection = mojitoCollections.marketplace.collections.find(
    (collection) => collection.slug == auctionSlug,
  );

  return mojitoCollection ? auctionSlug : null;
}

export function useCollectionSlug(props?: UseCollectionSlugProps): UseCollectionSlugReturn {
  const auctionSlug = getAuctionSlug(props);

  const transformFn = (mojitoCollections?: IMojitoMarketplaceResponse) => {
    return checkCollectionSlugExists(auctionSlug, mojitoCollections);
  };

  return useMojitoFactory<'slug', IMojitoMarketplaceResponse, UseCollectionSlugData>({
    as: 'slug',
    query: EMojitoQueries.marketplaceCollectionsInfoWithItemsIdAndSlug,
    variables: {
      id: config.MARKETPLACE_ID,
    },
    options: props?.options as any,
    transformFn,
  });
}
