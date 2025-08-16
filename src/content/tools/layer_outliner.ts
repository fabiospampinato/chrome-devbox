
/* IMPORT */

import useToolTrigger from '@hooks/use_tool_trigger';
import Debugger from '@lib/debugger';

/* MAIN */

const LayerOutliner: ToolConfig = {
  id: 'layer-outliner',
  name: 'Layer Outliner',
  command: 'devbox.layer-outliner.toggle',
  shortcut: 'Ctrl+Cmd+L',
  trigger: useToolTrigger ( (): Disposer => {
    Debugger.callInWorker ( 'Overlay.setShowDebugBorders', { show: true }, 1 );
    return (): void => {
      Debugger.callInWorker ( 'Overlay.setShowDebugBorders', { show: false }, -1 );
    };
  })
};

/* EXPORT */

export default LayerOutliner;
