/**
 * title: Basic usage
 * desc: This hook takes an optional slug or pathname param (defaults to location.pathname).
 */

import React, { useEffect, useState } from 'react';
import { DemoInterface } from '../../../components/demo/Interface/DemoInterface';
import { Json } from '../../../components/demo/Json/Json';
import { DemoProviders } from '../../../components/demo/Provider/DemoProvider';
import { useCollection, UseCollectionProps } from '../useCollection';
import * as DevSchema from '../../../domain/interfaces/mojito-schema-dev.interface';

const PAGE_SIZE = 4;

const DemoContent: React.FC = () => {
  const [page, setPage] = useState<undefined | number>();
  const [lastPage, setLastPage] = useState(1);

  const props: UseCollectionProps = {
    slug: 'pace-gallery',
    page,
    itemsPerPage: page ? PAGE_SIZE : undefined,
  };

  const result = useCollection(props);

  useEffect(() => {
    const itemCount = (result?.collection as unknown as DevSchema.MarketplaceCollection)
      ?.itemsCount;

    // This should be Math.floor instad of Math.ceil, but using Math.ceil here on purpose just to be able to
    // query for one page without items and see the result:
    const nextLastPage = itemCount ? Math.ceil(itemCount / PAGE_SIZE) : undefined;

    setLastPage((prevLastPage) => nextLastPage || prevLastPage);
  }, [result]);

  console.log({ page, lastPage });

  return <Json props={props} result={result} paginationProps={{ page, lastPage, setPage }} />;
};

export default () => {
  return (
    <DemoProviders>
      <DemoInterface demoComponent={DemoContent} />
    </DemoProviders>
  );
};
