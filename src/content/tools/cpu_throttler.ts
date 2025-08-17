
/* IMPORT */

import useToolTrigger from '@hooks/use_tool_trigger';
import Debugger from '@lib/debugger';

/* MAIN */

const CPUThrottler: ToolConfig = {
  id: 'cpu-throttler',
  name: 'CPU Throttler',
  description: 'Toggle 4x CPU speed throttling, to spot performance issues in the page',
  command: 'devbox.cpu-throttler.toggle',
  shortcut: 'Ctrl+Cmd+C',
  trigger: useToolTrigger ( (): Disposer => {
    Debugger.callInWorker ( 'Emulation.setCPUThrottlingRate', { rate: 4 }, 1 );
    return (): void => {
      Debugger.callInWorker ( 'Emulation.setCPUThrottlingRate', { rate: 1 }, -1 );
    };
  })
};

/* EXPORT */

export default CPUThrottler;
