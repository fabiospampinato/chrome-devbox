
/* IMPORT */

import useToolTrigger from '@hooks/use_tool_trigger';

/* MAIN */

const DebuggerStart: ToolConfig = {
  id: 'debugger-start',
  name: 'Start Debugger',
  command: 'devbox.debugger-start.trigger',
  shortcut: 'Ctrl+Cmd+I',
  trigger: useToolTrigger ( () => {
    debugger;
  }, false )
};

/* EXPORT */

export default DebuggerStart;
