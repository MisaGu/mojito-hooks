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

const PAGE_SIZE = 4;

const DemoContent: React.FC = () => {
  const [page, setPage] = useState<undefined | number>();

  const props: UseCollectionProps = {
    slug: 'pace-gallery',
    marketplaceID: config.MARKETPLACE_ID,
    page,
    pageSize: page === undefined ? undefined : PAGE_SIZE,
  };

  const result = useCollection(props);

  // TODO: result.queryResult.isPreviousData should be true, but it is not... :\

  // const lastPage = Math.ceil(result.collection.itemsCount / PAGE_SIZE);
  const lastPage = 9;

  // console.log(result.collection?.items.map((i)=>i.id));

  return (
    <Json
      props={props}
      result={result}
      controls={
        <>
          <label>
            <input
              type="checkbox"
              checked={page !== undefined}
              onChange={() => setPage((p) => (p === undefined ? 0 : undefined))}
            />
            📑
          </label>
          <button onClick={() => setPage(0)} disabled={!page}>
            ⏮️
          </button>
          <button onClick={() => setPage((p) => Math.max(0, (p ?? 0) - 1))} disabled={!page}>
            ◀️
          </button>
          <button
            onClick={() => setPage((p) => Math.min(lastPage, (p ?? 0) + 1))}
            disabled={page === undefined || page === lastPage}
          >
            ▶️
          </button>
          <button
            onClick={() => setPage(lastPage)}
            disabled={page === undefined || page === lastPage}
          >
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
