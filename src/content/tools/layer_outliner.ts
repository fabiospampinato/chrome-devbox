
/* IMPORT */

import useToolTrigger from '@hooks/use_tool_trigger';
import RPC from '@lib/rpc_frontend';

/* MAIN */

const LayerOutliner: ToolConfig = {
  id: 'layer-outliner',
  name: 'Layer Outliner',
  description: 'Toggle the layer outliner, to spot issues with the resulting layers in the page',
  command: 'devbox.layer-outliner.toggle',
  shortcut: 'Ctrl+Cmd+L',
  trigger: useToolTrigger ( (): Disposer => {
    RPC.debuggerCall ( 'Overlay.setShowDebugBorders', { show: true }, 1 );
    return (): void => {
      RPC.debuggerCall ( 'Overlay.setShowDebugBorders', { show: false }, -1 );
    };
  })
};

/* EXPORT */

export default LayerOutliner;
