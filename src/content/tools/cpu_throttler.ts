
/* IMPORT */

import useToolTrigger from '@hooks/use_tool_trigger';
import RPC from '@lib/rpc_frontend';
import State from '@lib/state';

/* MAIN */

const CpuThrottler: ToolConfig<CpuThrottlerState> = {
  id: 'cpu-throttler',
  name: 'CPU Throttler',
  description: 'Toggle 4x CPU speed throttling, to spot performance issues in the page',
  command: 'devbox.cpu-throttler.toggle',
  shortcut: 'Ctrl+Cmd+C',
  state: State.cpuThrottler,
  trigger: useToolTrigger ( (): Disposer => {
    State.cpuThrottler.active ( true );
    RPC.debuggerCall ( 'Emulation.setCPUThrottlingRate', { rate: 4 }, 1 );
    return (): void => {
      State.cpuThrottler.active ( false );
      RPC.debuggerCall ( 'Emulation.setCPUThrottlingRate', { rate: 1 }, -1 );
    };
  }, State.cpuThrottler.active )
};

/* EXPORT */

export default CpuThrottler;
