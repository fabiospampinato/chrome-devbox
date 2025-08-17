
/* IMPORT */

import {$$} from 'voby';
import useEffect from '@hooks/use_effect';

/* MAIN */

const useMutationObserver = ( ref: $<Element | undefined>, fn: MutationCallback, options: MutationObserverInit = {} ): void => {

  useEffect ( () => {

    const target = $$(ref);

    if ( !target ) return;

    const observer = new MutationObserver ( fn );

    observer.observe ( target, options );

    return () => {

      observer.disconnect ();

    };

  });

};

/* EXPORT */

export default useMutationObserver;
