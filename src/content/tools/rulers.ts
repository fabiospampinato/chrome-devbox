
/* IMPORT */

import useRulers from '@hooks/use_rulers';
import useTool from '@hooks/use_tool';

/* MAIN */

const Rulers: ToolConfig = {
  id: 'rulers',
  name: 'Rulers',
  command: 'devbox.rulers.toggle',
  shortcut: 'Ctrl+Cmd+R',
  trigger: useTool ( useRulers )
};

/* EXPORT */

export default Rulers;
