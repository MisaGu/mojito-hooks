import { config } from '../../domain/constants/general.constants';
import { IMojitoMarketplaceResponse } from '../../domain/interfaces';
import { getCollectionSlug } from '../../domain/utils/path.util';
import { EMojitoQueries } from '../../domain/gql/queries';
import { useMojitoFactory } from '../useMojitoFactory/useMojitoFactory';
import { BaseQueryHookPropsWithUrlAndSlug } from '../../domain/interfaces/hooks.interface';

function checkCollectionSlugExists(
  collectionSlug: string,
  mojitoCollections?: IMojitoMarketplaceResponse,
) {
  if (!mojitoCollections) return undefined;

  const mojitoCollection = mojitoCollections.marketplace.collections.find(
    (collection) => collection.slug == collectionSlug,
  );

  return mojitoCollection ? collectionSlug : null;
}

export type UseCollectionSlugData = ReturnType<typeof checkCollectionSlugExists>;

export type UseCollectionSlugReturn = ReturnType<typeof useCollectionSlug>;

export type UseCollectionSlugProps = BaseQueryHookPropsWithUrlAndSlug<UseCollectionSlugData>;

export function useCollectionSlug(props?: UseCollectionSlugProps) {
  const collectionSlug = getCollectionSlug(props);

  const transformFn = (mojitoCollections?: IMojitoMarketplaceResponse) => {
    return checkCollectionSlugExists(collectionSlug, mojitoCollections);
  };

  return useMojitoFactory({
    as: 'slug',
    query: EMojitoQueries.marketplaceCollectionsInfoWithItemsIdAndSlug,
    variables: {
      id: config.MARKETPLACE_ID,
    },
    options: props?.options as any,
    transformFn,
  });
}
