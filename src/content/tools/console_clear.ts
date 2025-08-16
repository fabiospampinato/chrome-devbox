
/* IMPORT */

import useTool from '@hooks/use_tool';

/* MAIN */

const ConsoleClear: ToolConfig = {
  id: 'console-clear',
  name: 'Clear Console',
  command: 'devbox.console-clear.trigger',
  shortcut: 'Ctrl+Cmd+K',
  trigger: useTool ( () => {
    console.clear ();
  }, false )
};

/* EXPORT */

export default ConsoleClear;
