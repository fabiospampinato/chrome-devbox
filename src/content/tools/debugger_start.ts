
/* IMPORT */

import useTool from '@hooks/use_tool';

/* MAIN */

const DebuggerStart: ToolConfig = {
  id: 'debugger-start',
  name: 'Start Debugger',
  command: 'devbox.debugger-start.trigger',
  shortcut: 'Ctrl+Cmd+I',
  trigger: useTool ( () => {
    debugger;
  }, false )
};

/* EXPORT */

export default DebuggerStart;
