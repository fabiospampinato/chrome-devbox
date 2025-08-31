
/* IMPORT */

import useToolTrigger from '@hooks/use_tool_trigger';
import {IS_MAC} from '@lib/constants';

/* MAIN */

const ConsoleClear: ToolConfig<{}> = {
  id: 'console-clear',
  name: 'Clear Console',
  description: 'Clear the DevTools console, for easier debugging',
  enabled: true,
  command: 'devbox.console-clear.trigger',
  shortcut: IS_MAC ? 'Ctrl+Cmd+K' : 'Ctrl+Alt+Shift+K',
  state: {},
  trigger: useToolTrigger ( (): void => {
    console.clear ();
  })
};

/* EXPORT */

export default ConsoleClear;
