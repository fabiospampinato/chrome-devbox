
/* IMPORT */

import useToolTrigger from '@hooks/use_tool_trigger';
import {IS_MAC} from '@lib/constants';
import RPC from '@lib/rpc_frontend';

/* MAIN */

//FIXME: Figure out why this thing doesn't work...

const GarbageCollect: ToolConfig<{}> = {
  id: 'garbage-collect',
  name: 'Collect Garbage',
  description: 'Trigger a garbage collection',
  command: 'devbox.garbage-collect.trigger',
  shortcut: IS_MAC ? 'Ctrl+Cmd+G' : 'Ctrl+Alt+Shift+G',
  state: {},
  trigger: useToolTrigger ( (): void => {
    RPC.debuggerCall ( 'HeapProfiler.collectGarbage', {}, 0 );
  })
};

/* EXPORT */

export default GarbageCollect;
