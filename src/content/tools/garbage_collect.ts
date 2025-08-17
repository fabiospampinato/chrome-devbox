
/* IMPORT */

import useToolTrigger from '@hooks/use_tool_trigger';
import RPC from '@lib/rpc_frontend';

/* MAIN */

//FIXME: Figure out why this thing doesn't work...

const GarbageCollect: ToolConfig = {
  id: 'garbage-collect',
  name: 'Collect Garbage',
  description: 'Trigger a garbage collection',
  command: 'devbox.garbage-collect.trigger',
  shortcut: 'Ctrl+Cmd+G',
  trigger: useToolTrigger ( (): void => {
    RPC.debuggerCall ( 'HeapProfiler.collectGarbage', {}, 0 );
  }, false )
};

/* EXPORT */

export default GarbageCollect;
