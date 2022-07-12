/**
 * title: Basic usage
 * desc: This hook takes an optional slug or pathname param (defaults to location.pathname).
 */

import React, { useEffect, useState } from 'react';
import { DemoInterface } from '../../../components/demo/Interface/DemoInterface';
import { Json } from '../../../components/demo/Json/Json';
import { DemoProviders } from '../../../components/demo/Provider/DemoProvider';
import { config } from '../../../domain/constants/general.constants';
import { useCollection, UseCollectionProps } from '../useCollection';

const PAGE_SIZE = 4;

const DemoContent: React.FC = () => {
  const [page, setPage] = useState<undefined | number>();
  const [lastPage, setLastPage] = useState(0);

  const props: UseCollectionProps = {
    slug: 'pace-gallery',
    marketplaceID: config.MARKETPLACE_ID,
    page,
    pageSize: page === undefined ? undefined : PAGE_SIZE,
  };

  const result = useCollection(props);

  useEffect(() => {
    const itemCount = result?.collection?.itemsCount;
    const nextLastPage = itemCount ? Math.ceil(itemCount / PAGE_SIZE) : 0;

    setLastPage((prevLastPage) => nextLastPage || prevLastPage);
  }, [result]);

  return <Json props={props} result={result} paginationProps={{ page, lastPage, setPage }} />;
};

export default () => {
  return (
    <DemoProviders>
      <DemoInterface demoComponent={DemoContent} />
    </DemoProviders>
  );
};
