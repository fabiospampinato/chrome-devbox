
/* IMPORT */

import {$$} from 'voby';
import useEffect from './use_effect';

/* MAIN */

const useResizeObserver = ( ref: $<Element | undefined>, fn: ResizeObserverCallback, options: ResizeObserverOptions = {} ): void => {

  useEffect ( () => {

    const target = $$(ref);

    if ( !target ) return;

    const observer = new ResizeObserver ( fn );

    observer.observe ( target, options );

    return () => {

      observer.disconnect ();

    };

  });

};

/* EXPORT */

export default useResizeObserver;
