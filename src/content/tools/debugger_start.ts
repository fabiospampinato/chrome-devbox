
/* IMPORT */

import useToolTrigger from '@hooks/use_tool_trigger';
import {IS_MAC} from '@lib/constants';

/* MAIN */

const DebuggerStart: ToolConfig<{}> = {
  id: 'debugger-start',
  name: 'Start Debugger',
  description: 'Start debugging, to instantly freeze the page and inspect it',
  enabled: true,
  command: 'devbox.debugger-start.trigger',
  shortcut: IS_MAC ? 'Ctrl+Cmd+I' : 'Ctrl+Alt+Shift+I',
  state: {},
  trigger: useToolTrigger ( (): void => {
    debugger;
  })
};

/* EXPORT */

export default DebuggerStart;
