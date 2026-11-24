
/* IMPORT */

import usePseudoElementOutliner from '@hooks/use_pseudo_element_outliner';
import useRootDispose from '@hooks/use_root_dispose';
import useToolTrigger from '@hooks/use_tool_trigger';
import {IS_MAC} from '@lib/constants';
import State from '@lib/state';

/* MAIN */

const PseudoElementOutliner: ToolConfig<PseudoElementOutlinerState> = {
  id: 'pseudo-element-outliner',
  name: 'Pseudo-element Outliner',
  description: 'Toggle the pseudo-element outliner, to spot generated pseudo-elements in the page',
  enabled: true,
  command: 'devbox.pseudo-element-outliner.toggle',
  shortcut: IS_MAC ? 'Ctrl+Cmd+U' : 'Ctrl+Alt+Shift+U',
  state: State.pseudoElementOutliner,
  trigger: useToolTrigger ( (): Disposer => {
    State.pseudoElementOutliner.active ( true );
    const dispose = useRootDispose ( usePseudoElementOutliner );
    return (): void => {
      State.pseudoElementOutliner.active ( false );
      dispose ();
    };
  }, State.pseudoElementOutliner.active )
};

/* EXPORT */

export default PseudoElementOutliner;
