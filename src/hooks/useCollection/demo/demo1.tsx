/**
 * title: Basic usage
 * desc: This hook takes an optional slug or pathname param (defaults to location.pathname).
 */

import React, { useState } from 'react';
import { DemoInterface } from '../../../components/demo/Interface/DemoInterface';
import { Json } from '../../../components/demo/Json/Json';
import { DemoProviders } from '../../../components/demo/Provider/DemoProvider';
import { config } from '../../../domain/constants/general.constants';
import { useCollection, UseCollectionProps } from '../useCollection';

const DemoContent: React.FC = () => {
  const [page, setPage] = useState(0);

  const props: UseCollectionProps = {
    slug: 'pace-gallery',
    marketplaceID: config.MARKETPLACE_ID,
    page,
    pageSize: 4,
  };

  const result = useCollection(props);

  // TODO: Update results to:
  // result.collection?.items = { pageInfo, data }
  // result.collection?.items.pageInfo = { page, totalPages }

  // TODO: result.queryResult.isPreviousData should be true, but it is not... :\

  const lastPage = 9;

  // console.log(result.collection?.items.map((i)=>i.id));

  return (
    <Json
      props={props}
      result={result}
      controls={
        <>
          <button onClick={() => setPage(0)} disabled={page === 0}>
            ⏮️
          </button>
          <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>
            ◀️
          </button>
          <button
            onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
            disabled={page === lastPage}
          >
            ▶️
          </button>
          <button onClick={() => setPage(lastPage)} disabled={page === lastPage}>
            ⏭️
          </button>
        </>
      }
    />
  );
};

export default () => {
  return (
    <DemoProviders>
      <DemoInterface demoComponent={DemoContent} />
    </DemoProviders>
  );
};
