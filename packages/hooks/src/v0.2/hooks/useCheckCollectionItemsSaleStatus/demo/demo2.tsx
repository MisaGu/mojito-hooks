/**
 * title: Toggle between any two values
 * desc: Accept two optional parameters and toggle between them.
 *
 * title.zh-CN: 在任意两个值之间切换
 * desc.zh-CN: 接受两个可选参数，在它们之间进行切换。
 */

import React from 'react';
import { useActiveBids } from 'hooks';

export default () => {
  const state = useActiveBids();

  return (
    <div>
      <p>
        <button type="button">Toggle</button>
        <button type="button">Set Hello</button>
        <button type="button">Set World</button>
        <button type="button">Set Left</button>
        <button type="button">Set Right</button>
      </p>
    </div>
  );
};
