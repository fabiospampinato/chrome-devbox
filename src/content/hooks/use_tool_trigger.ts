
/* IMPORT */

import {$$} from 'voby';
import useCleanup from '@hooks/use_cleanup';
import useEffect from '@hooks/use_effect';

/* MAIN */

const useToolTrigger = ( fn: () => Disposer | void, active?: ObservableReadonly<boolean> ): Callback => {

  let dispose: Disposer | void;

  const disable = (): void => {
    dispose?.();
    dispose = undefined;
  };

  const enable = (): void => {
    dispose = fn ();
  };

  const toggle = (): void => {
    if ( dispose ) { // Disabling
      disable ();
    } else { // Re-enabling
      enable ();
    }
  };

  useEffect ( () => { // Disposing on external deactivation
    if ( $$(active) === false ) {
      disable ();
    }
  })

  useCleanup ( disable ); // Disposing on unmount

  return toggle;

};

/* EXPORT */

export default useToolTrigger;
