
/* IMPORT */

import useRulers from '@hooks/use_rulers';
import useRootDispose from '@hooks/use_root_dispose';
import useToolTrigger from '@hooks/use_tool_trigger';
import State from '@lib/state';

/* MAIN */

const Rulers: ToolConfig<RulersState> = {
  id: 'rulers',
  name: 'Rulers',
  description: 'Toggle the rulers overlay, to spot misalignment issues in the page',
  command: 'devbox.rulers.toggle',
  shortcut: 'Ctrl+Cmd+R',
  state: State.rulers,
  trigger: useToolTrigger ( (): Disposer => {
    Rulers.state.active ( true );
    const dispose = useRootDispose ( useRulers );
    return (): void => {
      Rulers.state.active ( false );
      dispose ();
    };
  })
};

/* EXPORT */

export default Rulers;
