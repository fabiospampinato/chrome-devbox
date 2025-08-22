
/* IMPORT */

import useElementCounter from '@hooks/use_element_counter';
import useRootDispose from '@hooks/use_root_dispose';
import useToolTrigger from '@hooks/use_tool_trigger';
import {IS_MAC} from '@lib/constants';
import State from '@lib/state';

/* MAIN */

const ElementCounter: ToolConfig<ElementCounterState> = {
  id: 'element-counter',
  name: 'Element Counter',
  description: 'Toggle the element counter, to spot unnecessary elements being used in the page',
  command: 'devbox.element-counter.toggle',
  shortcut: IS_MAC ? 'Ctrl+Cmd+E' : 'Ctrl+Alt+Shift+E',
  state: State.elementCounter,
  trigger: useToolTrigger ( (): Disposer => {
    State.elementCounter.active ( true );
    const dispose = useRootDispose ( useElementCounter );
    return (): void => {
      State.elementCounter.active ( false );
      dispose ();
    };
  }, State.elementCounter.active )
};

/* EXPORT */

export default ElementCounter;
