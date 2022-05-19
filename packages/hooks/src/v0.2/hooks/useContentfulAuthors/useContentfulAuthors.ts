import { IContentfulAuthor, IContentfulAuthorsQuery } from '../../domain/interfaces';
import { QueryResult } from '../../domain/utils/gql.utils';
import { BaseQueryHookProps } from '../../domain/interfaces/hooks.interface';
import { useContentfulFactory } from '../useContentfulFactory/useContentfulFactory';
import { EContentfulQueries } from '../../domain/gql/contentful';

export type UseContentfulAuthorsData = undefined | null | IContentfulAuthor[];

export type UseContentfulAuthorsReturn = QueryResult<'authors', UseContentfulAuthorsData>;

export type UseContentfulAuthorsProps = BaseQueryHookProps<IContentfulAuthorsQuery>;

// TODO: Memo this function:

function transformFn(
  authorsQuery?: undefined | null | IContentfulAuthorsQuery,
): UseContentfulAuthorsData {
  if (!authorsQuery) return undefined;

  return authorsQuery.authorCollection?.items || [];
}

export function useContentfulAuthors({
  options,
}: UseContentfulAuthorsProps = {}): UseContentfulAuthorsReturn {
  return useContentfulFactory<'authors', IContentfulAuthorsQuery, UseContentfulAuthorsData>({
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
