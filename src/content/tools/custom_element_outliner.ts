
/* IMPORT */

import useCustomElementOutliner from '@hooks/use_custom_element_outliner';
import useRootDispose from '@hooks/use_root_dispose';
import useToolTrigger from '@hooks/use_tool_trigger';
import State from '@lib/state';

/* MAIN */

const CustomElementOutliner: ToolConfig<CustomElementOutlinerState> = {
  id: 'custom-element-outliner',
  name: 'Custom Element Outliner',
  description: 'Toggle the custom element outliner, to spot where and which custom elements are used in the page',
  command: 'devbox.custom-element-outliner.toggle',
  shortcut: 'Ctrl+Cmd+W',
  state: State.customElementOutliner,
  trigger: useToolTrigger ( (): Disposer => {
    State.customElementOutliner.active ( true );
    const dispose = useRootDispose ( useCustomElementOutliner );
    return (): void => {
      State.customElementOutliner.active ( false );
      dispose ();
    };
  }, State.customElementOutliner.active )
};

/* EXPORT */

export default CustomElementOutliner;
