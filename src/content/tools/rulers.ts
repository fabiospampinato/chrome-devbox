
/* IMPORT */

import useRulers from '@hooks/use_rulers';
import useRootDispose from '@hooks/use_root_dispose';
import useToolTrigger from '@hooks/use_tool_trigger';
import {IS_MAC} from '@lib/constants';
import State from '@lib/state';

/* MAIN */

const Rulers: ToolConfig<RulersState> = {
  id: 'rulers',
  name: 'Rulers',
  description: 'Toggle the rulers overlay, to spot misalignment issues in the page',
  command: 'devbox.rulers.toggle',
  shortcut: IS_MAC ? 'Ctrl+Cmd+R' : 'Ctrl+Alt+Shift+R',
  state: State.rulers,
  trigger: useToolTrigger ( (): Disposer => {
    State.rulers.active ( true );
    const dispose = useRootDispose ( useRulers );
    return (): void => {
      State.rulers.active ( false );
      dispose ();
    };
  }, State.rulers.active )
};

/* EXPORT */

export default Rulers;
