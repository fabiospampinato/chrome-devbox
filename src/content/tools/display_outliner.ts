
/* IMPORT */

import useDisplayOutliner from '@hooks/use_display_outliner';
import useRootDispose from '@hooks/use_root_dispose';
import useToolTrigger from '@hooks/use_tool_trigger';
import {IS_MAC} from '@lib/constants';
import State from '@lib/state';

/* MAIN */

const DisplayOutliner: ToolConfig<DisplayOutlinerState> = {
  id: 'display-outliner',
  name: 'Display Outliner',
  description: 'Toggle the display outliner, to spot incorrect display values',
  enabled: false,
  command: 'devbox.display-outliner.toggle',
  shortcut: IS_MAC ? 'Ctrl+Cmd+G' : 'Ctrl+Alt+Shift+G',
  state: State.displayOutliner,
  trigger: useToolTrigger ( (): Disposer => {
    State.displayOutliner.active ( true );
    const dispose = useRootDispose ( useDisplayOutliner );
    return (): void => {
      State.displayOutliner.active ( false );
      dispose ();
    };
  }, State.displayOutliner.active )
};

/* EXPORT */

export default DisplayOutliner;
