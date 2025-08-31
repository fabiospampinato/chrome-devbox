
/* IMPORT */

import useOverflowOutliner from '@hooks/use_overflow_outliner';
import useRootDispose from '@hooks/use_root_dispose';
import useToolTrigger from '@hooks/use_tool_trigger';
import {IS_MAC} from '@lib/constants';
import State from '@lib/state';

/* MAIN */

const OverflowOutliner: ToolConfig<OverflowOutlinerState> = {
  id: 'overflow-outliner',
  name: 'Overflow Outliner',
  description: 'Toggle the overflow outliner, to spot incorrect overflow values',
  enabled: false,
  command: 'devbox.overflow-outliner.toggle',
  shortcut: IS_MAC ? 'Ctrl+Cmd+O' : 'Ctrl+Alt+Shift+O',
  state: State.overflowOutliner,
  trigger: useToolTrigger ( (): Disposer => {
    State.overflowOutliner.active ( true );
    const dispose = useRootDispose ( useOverflowOutliner );
    return (): void => {
      State.overflowOutliner.active ( false );
      dispose ();
    };
  }, State.overflowOutliner.active )
};

/* EXPORT */

export default OverflowOutliner;
