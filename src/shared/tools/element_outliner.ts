
/* IMPORT */

import {useElementOutliner} from '../hooks';

/* MAIN */

const ElementOutliner: ToolConfig = {
  id: 'element-outliner',
  name: 'Element Outliner',
  type: 'toggle',
  trigger: useElementOutliner
};

/* EXPORT */

export default ElementOutliner;
