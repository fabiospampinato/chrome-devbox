
/* IMPORT */

import useEffect from '@hooks/use_effect';
import useInterval from '@hooks/use_interval';

/* MAIN */

const useLag = ( interval: $<number>, callback: ( elapsed: number ) => void ): void => {

  useEffect ( () => {

    let start = performance.now ();

    useInterval ( () => {

      const end = performance.now ();
      const elapsed = ( end - start );

      start = end;

      callback ( elapsed );

    }, interval );

  });

};

/* EXPORT */

export default useLag;
