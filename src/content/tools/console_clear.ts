
/* IMPORT */

import useToolTrigger from '@hooks/use_tool_trigger';

/* MAIN */

const ConsoleClear: ToolConfig = {
  id: 'console-clear',
  name: 'Clear Console',
  command: 'devbox.console-clear.trigger',
  shortcut: 'Ctrl+Cmd+K',
  trigger: useToolTrigger ( () => {
    console.clear ();
  }, false )
};

/* EXPORT */

export default ConsoleClear;
