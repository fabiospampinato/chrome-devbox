
/* IMPORT */

import usePseudoElementCounter from '@hooks/use_pseudo_element_counter';
import useRootDispose from '@hooks/use_root_dispose';
import useToolTrigger from '@hooks/use_tool_trigger';
import {IS_MAC} from '@lib/constants';
import State from '@lib/state';

/* MAIN */

const PseudoElementCounter: ToolConfig<PseudoElementCounterState> = {
  id: 'pseudo-element-counter',
  name: 'Pseudo-element Counter',
  description: 'Toggle the pseudo-element counter, to spot unnecessary generated content in the page',
  enabled: true,
  command: 'devbox.pseudo-element-counter.toggle',
  shortcut: IS_MAC ? 'Ctrl+Cmd+Y' : 'Ctrl+Alt+Shift+Y',
  state: State.pseudoElementCounter,
  trigger: useToolTrigger ( (): Disposer => {
    State.pseudoElementCounter.active ( true );
    const dispose = useRootDispose ( usePseudoElementCounter );
    return (): void => {
      State.pseudoElementCounter.active ( false );
      dispose ();
    };
  }, State.pseudoElementCounter.active )
};

/* EXPORT */

export default PseudoElementCounter;
