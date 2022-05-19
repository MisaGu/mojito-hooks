import { IContentfulAuthorsQuery } from '../../domain/interfaces';
import { BaseHookProps } from '../../domain/interfaces/hooks.interface';
import { useContentfulFactory } from '../useContentfulFactory/useContentfulFactory';
import { EContentfulQueries } from '../../domain/gql/contentful';

function transformFn(authorsQuery?: IContentfulAuthorsQuery) {
  if (!authorsQuery) return undefined;

  return authorsQuery.authorCollection?.items || [];
}

export type UseContentfulAuthorsData = ReturnType<typeof transformFn>;

export type UseContentfulAuthorsReturn = ReturnType<typeof useContentfulAuthors>;

export type UseContentfulAuthorsProps = BaseHookProps<UseContentfulAuthorsData>;

export function useContentfulAuthors({ options }: UseContentfulAuthorsProps = {}) {
  return useContentfulFactory({
    as: 'authors',
    query: EContentfulQueries.authors,
    options,
    transformFn,
  });
}

// legacy function
/*

export function useContentfulAuthors(): {
  authors: IContentfulAuthor[];
  authorsError: any;
  authorsLoading: boolean;
} {
  const { data, error, loading } = useContentful<IContentfulAuthorsQuery>(
    EContentfulQueries.authors,
  );
  if (error) console.error(error);

  return {
    authors: data?.authorCollection?.items ?? [],
    authorsError: error,
    authorsLoading: loading,
  };
}


*/
