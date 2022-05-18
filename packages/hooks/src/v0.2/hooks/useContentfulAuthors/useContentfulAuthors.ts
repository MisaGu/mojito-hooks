export function useContentfulAuthors() {
  return true;
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
