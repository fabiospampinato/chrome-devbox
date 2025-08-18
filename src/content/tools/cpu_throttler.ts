
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
    CpuThrottler.state.active ( true );
    RPC.debuggerCall ( 'Emulation.setCPUThrottlingRate', { rate: 4 }, 1 );
    return (): void => {
      CpuThrottler.state.active ( false );
      RPC.debuggerCall ( 'Emulation.setCPUThrottlingRate', { rate: 1 }, -1 );
    };
  })
};

/* EXPORT */

export default CpuThrottler;
