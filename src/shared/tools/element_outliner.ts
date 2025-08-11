
/* IMPORT */

import {useElementOutliner} from '../hooks';

/* MAIN */

const ElementOutliner: ToolConfig = {
  id: 'element-outliner',
  name: 'Element Outliner',
  command: 'element-outliner.toggle',
  shortcut: 'Ctrl+Cmd+E',
  type: 'toggle',
  trigger: useElementOutliner
};

/* EXPORT */

export default ElementOutliner;
