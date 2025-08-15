
/* IMPORT */

import useTool from '@hooks/use_tool';

/* MAIN */

const Debugger: ToolConfig = {
  id: 'debugger',
  name: 'Debugger',
  command: 'devbox.debugger.trigger',
  shortcut: 'Ctrl+Cmd+I',
  trigger: useTool ( () => {
    debugger;
  }, false )
};

/* EXPORT */

export default Debugger;
