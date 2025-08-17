
/* IMPORT */

import useToolTrigger from '@hooks/use_tool_trigger';
import RPC from '@lib/rpc_frontend';

/* MAIN */

const FPSMeter: ToolConfig = {
  id: 'fps-meter',
  name: 'FPS Meter',
  description: 'Toggle the FPS meter, to spot smoothness issues in the page',
  command: 'devbox.fps-meter.toggle',
  shortcut: 'Ctrl+Cmd+F',
  trigger: useToolTrigger ( (): Disposer => {
    RPC.debuggerCall ( 'Overlay.setShowFPSCounter', { show: true }, 1 );
    return (): void => {
      RPC.debuggerCall ( 'Overlay.setShowFPSCounter', { show: false }, -1 );
    };
  })
};

/* EXPORT */

export default FPSMeter;
