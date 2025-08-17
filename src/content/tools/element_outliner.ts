
/* IMPORT */

import {$} from 'voby';
import useElementOutliner from '@hooks/use_element_outliner';
import useRootDispose from '@hooks/use_root_dispose';
import useToolTrigger from '@hooks/use_tool_trigger';

/* MAIN */

const ElementOutliner: ToolConfig = {
  id: 'element-outliner',
  name: 'Element Outliner',
  description: 'Toggle the element outliner, to spot unnecessary elements being used in the page',
  command: 'devbox.element-outliner.toggle',
  shortcut: 'Ctrl+Cmd+E',
  active: $(false),
  trigger: useToolTrigger ( (): Disposer => {
    ElementOutliner.active?.( true );
    const dispose = useRootDispose ( useElementOutliner );
    return (): void => {
      ElementOutliner.active?.( false );
      dispose ();
    };
  })
};

/* EXPORT */

export default ElementOutliner;
