
/* IMPORT */

import useToolTrigger from '@hooks/use_tool_trigger';
import RPC from '@lib/rpc_frontend';
import State from '@lib/state';

/* MAIN */

const LayerOutliner: ToolConfig<LayerOutlinerState> = {
  id: 'layer-outliner',
  name: 'Layer Outliner',
  description: 'Toggle the layer outliner, to spot issues with the resulting layers in the page',
  command: 'devbox.layer-outliner.toggle',
  shortcut: 'Ctrl+Cmd+L',
  state: State.layerOutliner,
  trigger: useToolTrigger ( (): Disposer => {
    LayerOutliner.state.active ( true );
    RPC.debuggerCall ( 'Overlay.setShowDebugBorders', { show: true }, 1 );
    return (): void => {
      LayerOutliner.state.active ( false );
      RPC.debuggerCall ( 'Overlay.setShowDebugBorders', { show: false }, -1 );
    };
  })
};

/* EXPORT */

export default LayerOutliner;
