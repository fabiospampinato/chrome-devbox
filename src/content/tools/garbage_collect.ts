
/* IMPORT */

import useToolTrigger from '@hooks/use_tool_trigger';
import Debugger from '@lib/debugger';

/* MAIN */

//FIXME: Figure out why this thing doesn't work...

const GarbageCollect: ToolConfig = {
  id: 'garbage-collect',
  name: 'Collect Garbage',
  description: 'Trigger a garbage collection',
  command: 'devbox.garbage-collect.trigger',
  shortcut: 'Ctrl+Cmd+G',
  trigger: useToolTrigger ( (): void => {
    Debugger.callInWorker ( 'HeapProfiler.collectGarbage', {}, 0 );
  }, false )
};

/* EXPORT */

export default GarbageCollect;
