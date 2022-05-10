/**
 * title: Basic usage
 * desc: Default value is boolean，alike useBoolean.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 默认为 boolean 切换，基础用法与 useBoolean 一致。
 */

import React from 'react';
import { useActiveBids } from 'hooks';

export default () => {
  const state = useActiveBids();

  return (
    <div>
      <p>Effects：{`${state}`}</p>
      <p>
        <button type="button">Toggle</button>
        <button type="button" style={{ margin: '0 8px' }}>
          Toggle False
        </button>
        <button type="button">Toggle True</button>
      </p>
    </div>
  );
};
