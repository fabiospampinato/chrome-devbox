
/* IMPORT */

import useTool from '@hooks/use_tool';

/* MAIN */

const ConsoleClearer: ToolConfig = {
  id: 'console-clearer',
  name: 'Console Clearer',
  command: 'devbox.console-clearer.trigger',
  shortcut: 'Ctrl+Cmd+K',
  trigger: useTool ( () => {
    console.clear ();
  }, false )
};

/* EXPORT */

export default ConsoleClearer;
