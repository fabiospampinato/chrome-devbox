
/* IMPORT */

import ShoSho from 'shosho';
import {useTool} from '../shared/hooks';
import {ElementOutliner} from '../shared/tools';

/* MAIN */

const shortcuts = new ShoSho ({
  capture: true,
  target: document,
  shouldHandleEvent: () => true,
});

shortcuts.register ( 'Ctrl+Cmd+B', useTool ( ElementOutliner ) );

shortcuts.start ();
