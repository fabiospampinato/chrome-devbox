
/* IMPORT */

import useElementOutliner from '@hooks/use_element_outliner';
import useTool from '@hooks/use_tool';

/* MAIN */

const ElementOutliner: ToolConfig = {
  id: 'element-outliner',
  name: 'Element Outliner',
  command: 'element-outliner.toggle',
  shortcut: 'Ctrl+Cmd+E',
  trigger: useTool ( useElementOutliner )
};

/* EXPORT */

export default ElementOutliner;
