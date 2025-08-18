
/* IMPORT */

import useElementOutliner from '@hooks/use_element_outliner';
import useRootDispose from '@hooks/use_root_dispose';
import useToolTrigger from '@hooks/use_tool_trigger';
import State from '@lib/state';

/* MAIN */

const ElementOutliner: ToolConfig<ElementOutlinerState> = {
  id: 'element-outliner',
  name: 'Element Outliner',
  description: 'Toggle the element outliner, to spot unnecessary elements being used in the page',
  command: 'devbox.element-outliner.toggle',
  shortcut: 'Ctrl+Cmd+E',
  state: State.elementOutliner,
  trigger: useToolTrigger ( (): Disposer => {
    ElementOutliner.state.active ( true );
    const dispose = useRootDispose ( useElementOutliner );
    return (): void => {
      ElementOutliner.state.active ( false );
      dispose ();
    };
  })
};

/* EXPORT */

export default ElementOutliner;
