import { config } from '../../domain/constants/general.constants';
import { IMojitoMarketplaceResponse } from '../../domain/interfaces';
import { getCollectionSlug } from '../../domain/utils/path.util';
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
  collectionSlug: string,
  mojitoCollections?: IMojitoMarketplaceResponse,
): UseCollectionSlugData {
  if (!mojitoCollections) return undefined;

  const mojitoCollection = mojitoCollections.marketplace.collections.find(
    (collection) => collection.slug == collectionSlug,
  );

  return mojitoCollection ? collectionSlug : null;
}

export function useCollectionSlug(props?: UseCollectionSlugProps): UseCollectionSlugReturn {
  const collectionSlug = getCollectionSlug(props);

  const transformFn = (mojitoCollections?: IMojitoMarketplaceResponse) => {
    return checkCollectionSlugExists(collectionSlug, mojitoCollections);
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
