
/* IMPORT */

import useElementOutliner from '@hooks/use_element_outliner';
import useToolTrigger from '@hooks/use_tool_trigger';

/* MAIN */

const ElementOutliner: ToolConfig = {
  id: 'element-outliner',
  name: 'Element Outliner',
  description: 'Toggle the element outliner, to spot unnecessary elements being used in the page',
  command: 'devbox.element-outliner.toggle',
  shortcut: 'Ctrl+Cmd+E',
  trigger: useToolTrigger ( useElementOutliner )
};

/* EXPORT */

export default ElementOutliner;
