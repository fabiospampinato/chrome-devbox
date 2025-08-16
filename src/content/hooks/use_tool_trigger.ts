
/* IMPORT */

import useCleanup from '@hooks/use_cleanup';
import useRoot from '@hooks/use_root';

/* MAIN */

const useToolTrigger = ( fn: () => Disposer | void, isToggle: boolean = true ): Callback => {

  let disposeRoot: Disposer | void;
  let disposeTool: Disposer | void;

  const disable = (): void => {
    disposeRoot?.();
    disposeRoot = undefined;
    disposeTool?.();
    disposeTool = undefined;
  };

  const enable = (): void => {
    useRoot ( dispose => {
      disposeRoot = dispose;
      disposeTool = fn ();
    });
  };

  const toggle = (): void => {
    const shouldEnable = !isToggle || !disposeRoot;
    disable ();
    if ( shouldEnable ) {
      enable ();
    }
  };

  useCleanup ( disable );

  return toggle;

};

/* EXPORT */

export default useToolTrigger;
