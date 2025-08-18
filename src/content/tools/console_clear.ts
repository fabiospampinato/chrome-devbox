
/* IMPORT */

import useToolTrigger from '@hooks/use_tool_trigger';

/* MAIN */

const ConsoleClear: ToolConfig<{}> = {
  id: 'console-clear',
  name: 'Clear Console',
  description: 'Clear the DevTools console, for easier debugging',
  command: 'devbox.console-clear.trigger',
  shortcut: 'Ctrl+Cmd+K',
  state: {},
  trigger: useToolTrigger ( (): void => {
    console.clear ();
  })
};

/* EXPORT */

export default ConsoleClear;
