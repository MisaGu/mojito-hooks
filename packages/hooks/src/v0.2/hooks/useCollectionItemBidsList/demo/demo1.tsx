/**
 * title: Basic usage
 * desc: Default value is boolean，alike useBoolean.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 默认为 boolean 切换，基础用法与 useBoolean 一致。
 */

import React from 'react';
import { DEMO_COLLECTION_ITEM_ID } from '../../../components/demo/constants/demo.constants';
import { DemoInterface } from '../../../components/demo/Interface/DemoInterface';
import { Json } from '../../../components/demo/Json/Json';
import { DemoProviders } from '../../../components/demo/Provider/DemoProvider';
import { useCollectionItemBidsList } from '../useCollectionItemBidsList';

const DemoContent: React.FC = () => {
  const result = useCollectionItemBidsList({
    collectionItemID: DEMO_COLLECTION_ITEM_ID,
  });

  return <Json result={result} />;
};

export default () => {
  return (
    <DemoProviders>
      <DemoInterface demoComponent={DemoContent} />
    </DemoProviders>
  );
};
