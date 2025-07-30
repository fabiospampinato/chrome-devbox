
/* IMPORT */

import useCleanup from './use_cleanup';
import useRoot from './use_root';

/* MAIN */

const useTool = ( tool: ToolConfig ): Callback => {

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
      disposeTool = tool.trigger ();
    });
  };

  const toggle = (): void => {
    const isAction = tool.type === 'action';
    const shouldEnable = isAction || !disposeRoot;
    disable ();
    if ( shouldEnable ) {
      enable ();
    }
  };

  useCleanup ( disable );

  return toggle;

};

/* EXPORT */

export default useTool;
