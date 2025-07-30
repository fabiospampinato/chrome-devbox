
/* IMPORT */

import {$, $$} from 'voby';
import {isEqual} from '../utils';
import useEffect from './use_effect';
import useResizeObserver from './use_resize_observer';

/* MAIN */

const useDimensions = ( ref: $<Element | undefined> ): ObservableReadonly<{ width: number; height: number }> => {

  const dimensions = $({ width: 0, height: 0 }, { equals: isEqual });

  useEffect ( () => {

    const target = $$(ref);

    if ( !target ) return;

    useResizeObserver ( target, records => {

      const record = records.at ( -1 );
      const width = Math.round ( record?.borderBoxSize[0]?.inlineSize ?? record?.contentRect.width ?? target.clientWidth );
      const height = Math.round ( record?.borderBoxSize[0]?.blockSize ?? record?.contentRect.height ?? target.clientHeight );

      dimensions ({ width, height });

    });

  });

  return dimensions;

};

/* EXPORT */

export default useDimensions;
