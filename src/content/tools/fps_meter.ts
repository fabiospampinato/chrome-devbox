
/* IMPORT */

import useToolTrigger from '@hooks/use_tool_trigger';
import {IS_MAC} from '@lib/constants';
import RPC from '@lib/rpc_frontend';
import State from '@lib/state';

/* MAIN */

const FpsMeter: ToolConfig<FpsMeterState> = {
  id: 'fps-meter',
  name: 'FPS Meter',
  description: 'Toggle the FPS meter, to spot smoothness issues in the page',
  enabled: true,
  command: 'devbox.fps-meter.toggle',
  shortcut: IS_MAC ? 'Ctrl+Cmd+F' : 'Ctrl+Alt+Shift+F',
  state: State.fpsMeter,
  trigger: useToolTrigger ( (): Disposer => {
    State.fpsMeter.active ( true );
    RPC.debuggerCall ( 'Overlay.setShowFPSCounter', { show: true }, 1 );
    return (): void => {
      State.fpsMeter.active ( false );
      RPC.debuggerCall ( 'Overlay.setShowFPSCounter', { show: false }, -1 );
    };
  }, State.fpsMeter.active )
};

/* EXPORT */

export default FpsMeter;
