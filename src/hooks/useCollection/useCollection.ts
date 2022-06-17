import { useQueryClient } from 'react-query';
import { config } from '../../domain/constants/general.constants';
import {
  IContentfulAuctionsSlugListQuery,
  MojitoMarketplaceCollection,
  MarketplaceResponse,
  CollectionItemBySlugResponse,
} from '../../domain/interfaces';
import { getCollectionSlugFromPathname } from '../../domain/utils/state/path.util';
import { EMojitoKey } from '../../domain/enums/state.enum';
import { EContentfulKey } from '../../domain/enums/state.enum';
import { QueryKey } from '../../domain/utils/queryKeyFactory.util';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';
import { BaseQueryHookPropsWithUrlAndSlug } from '../../domain/interfaces/hooks.interface';

function selectorFn(response?: CollectionItemBySlugResponse) {
  if (!response) return undefined;

  return response.collectionBySlug;
}

export type UseCollectionData = ReturnType<typeof selectorFn>;

export type UseCollectionReturn = ReturnType<typeof useCollection>;

export type UseCollectionProps = BaseQueryHookPropsWithUrlAndSlug<UseCollectionData>;

export function useCollection(props?: UseCollectionProps) {
  const queryClient = useQueryClient();
  const collectionSlug = props?.slug || getCollectionSlugFromPathname();

  async function preloadFn() {
    const [mojitoCollections, contentfulCollectionSlugsOnly] = await Promise.all([
      queryClient.fetchQuery<MarketplaceResponse>(
        QueryKey.get(EMojitoKey.marketplaceCollectionsInfoWithItemsIdAndSlug, {
          id: config.MARKETPLACE_ID,
        }),
      ),
      queryClient.fetchQuery<IContentfulAuctionsSlugListQuery>(
        QueryKey.get(EContentfulKey.auctionsSlugList),
      ),
    ]);

    const mojitoCollection = mojitoCollections.marketplace.collections.find(
      (collection) => collection.slug == collectionSlug,
    );

    const contentfulCollection = contentfulCollectionSlugsOnly.auctionCollection.items.find(
      (collection) => collection.slug == collectionSlug,
    );

    if (!mojitoCollection) return;

    if (contentfulCollection) {
      const collectionItems = mojitoCollection.items.map((item) => item.id);

      await Promise.all([
        queryClient.prefetchQuery(
          QueryKey.get(EContentfulKey.auctionBySlug, { slug: collectionSlug }),
        ),
        queryClient.prefetchQuery(
          QueryKey.get(EContentfulKey.shortLots, { mojitoIds: collectionItems }),
        ),
      ]);
    }
  }

  return useMojitoFactory({
    as: 'collection',
    query: EMojitoKey.collectionBySlug,
    variables: {
      slug: collectionSlug,
      marketplaceID: config.MARKETPLACE_ID,
    },
    options: props?.options,
    preloadFn,
    selectorFn,
  });
}

export default useCollection;
