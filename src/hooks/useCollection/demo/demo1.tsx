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
    slug: 'metaverso',
    page,
    itemsPerPage: page ? PAGE_SIZE : undefined,
  };

  const result = useCollection(props);

  useEffect(() => {
    const itemCount = (result?.collection as unknown as DevSchema.MarketplaceCollection)
      ?.itemsCount;

    const nextLastPage = itemCount ? Math.ceil(itemCount / PAGE_SIZE) : undefined;

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
