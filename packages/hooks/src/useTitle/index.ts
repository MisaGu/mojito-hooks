import { useEffect, useRef } from 'react';
import isBrowser from '../utils/isBrowser';

export interface Options {
  restoreOnUnmount?: boolean;
}

const DEFAULT_OPTIONS: Options = {
  restoreOnUnmount: false,
};

function useTitle(title: string, options: Options = DEFAULT_OPTIONS) {
  const titleRef = useRef(isBrowser ? document.title : '');
  useEffect(() => {
    document.title = title;

    return () => {
      if (options.restoreOnUnmount) {
        document.title = titleRef.current;
      }
    };
  }, [title]);
}

export default useTitle;
