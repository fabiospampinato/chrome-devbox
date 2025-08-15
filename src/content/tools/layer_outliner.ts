
/* IMPORT */

import useTool from '@hooks/use_tool';
import Debugger from '@lib/debugger';

/* MAIN */

const LayerOutliner: ToolConfig = {
  id: 'layer-highlighter',
  name: 'Layer Highlighter',
  command: 'devbox.layer-highlighter.toggle',
  shortcut: 'Ctrl+Cmd+L',
  trigger: useTool ( (): Disposer => {
    Debugger.callInWorker ( 'Overlay.setShowDebugBorders', { show: true }, 1 );
    return (): void => {
      Debugger.callInWorker ( 'Overlay.setShowDebugBorders', { show: false }, 1 );
    };
  })
};

/* EXPORT */

export default LayerOutliner;
