
/* IMPORT */

import useSizeOutliner from '@hooks/use_size_outliner';
import useRootDispose from '@hooks/use_root_dispose';
import useToolTrigger from '@hooks/use_tool_trigger';
import {IS_MAC} from '@lib/constants';
import State from '@lib/state';

/* MAIN */

const SizeOutliner: ToolConfig<SizeOutlinerState> = {
  id: 'size-outliner',
  name: 'Size Outliner',
  description: 'Toggle the size outliner, to see the measured size of every element in the page',
  enabled: true,
  command: 'devbox.size-outliner.toggle',
  shortcut: IS_MAC ? 'Ctrl+Cmd+Z' : 'Ctrl+Alt+Shift+Z',
  state: State.sizeOutliner,
  trigger: useToolTrigger ( (): Disposer => {
    State.sizeOutliner.active ( true );
    const dispose = useRootDispose ( useSizeOutliner );
    return (): void => {
      State.sizeOutliner.active ( false );
      dispose ();
    };
  }, State.sizeOutliner.active )
};

/* EXPORT */

export default SizeOutliner;
