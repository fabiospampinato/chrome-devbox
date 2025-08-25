
/* IMPORT */

import useIntrinsicSizeOutliner from '@hooks/use_intrinsic_size_outliner';
import useRootDispose from '@hooks/use_root_dispose';
import useToolTrigger from '@hooks/use_tool_trigger';
import {IS_MAC} from '@lib/constants';
import State from '@lib/state';

/* MAIN */

const IntrinsicSizeOutliner: ToolConfig<IntrinsicSizeOutlinerState> = {
  id: 'intrinsic-size-outliner',
  name: 'Intrinsic Size Outliner',
  description: 'Toggle the intrinsic size outliner, to spot predicted vs measured size mismatches',
  command: 'devbox.intrinsic-size-outliner.toggle',
  shortcut: IS_MAC ? 'Ctrl+Cmd+V' : 'Ctrl+Alt+Shift+V',
  state: State.intrinsicSizeOutliner,
  trigger: useToolTrigger ( (): Disposer => {
    State.intrinsicSizeOutliner.active ( true );
    const dispose = useRootDispose ( useIntrinsicSizeOutliner );
    return (): void => {
      State.intrinsicSizeOutliner.active ( false );
      dispose ();
    };
  }, State.intrinsicSizeOutliner.active )
};

/* EXPORT */

export default IntrinsicSizeOutliner;
