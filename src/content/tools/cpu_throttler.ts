
/* IMPORT */

import {$} from 'voby';
import useToolTrigger from '@hooks/use_tool_trigger';
import RPC from '@lib/rpc_frontend';

/* MAIN */

const CPUThrottler: ToolConfig = {
  id: 'cpu-throttler',
  name: 'CPU Throttler',
  description: 'Toggle 4x CPU speed throttling, to spot performance issues in the page',
  command: 'devbox.cpu-throttler.toggle',
  shortcut: 'Ctrl+Cmd+C',
  active: $(false),
  trigger: useToolTrigger ( (): Disposer => {
    CPUThrottler.active?.( true );
    RPC.debuggerCall ( 'Emulation.setCPUThrottlingRate', { rate: 4 }, 1 );
    return (): void => {
      CPUThrottler.active?.( false );
      RPC.debuggerCall ( 'Emulation.setCPUThrottlingRate', { rate: 1 }, -1 );
    };
  })
};

/* EXPORT */

export default CPUThrottler;
