
/* IMPORT */

import useRulers from '@hooks/use_rulers';
import useToolTrigger from '@hooks/use_tool_trigger';

/* MAIN */

const Rulers: ToolConfig = {
  id: 'rulers',
  name: 'Rulers',
  description: 'Toggle the rulers overlay, to spot misalignment issues in the page',
  command: 'devbox.rulers.toggle',
  shortcut: 'Ctrl+Cmd+R',
  trigger: useToolTrigger ( useRulers )
};

/* EXPORT */

export default Rulers;
