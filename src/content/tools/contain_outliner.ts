
/* IMPORT */

import useContainOutliner from '@hooks/use_contain_outliner';
import useRootDispose from '@hooks/use_root_dispose';
import useToolTrigger from '@hooks/use_tool_trigger';
import {IS_MAC} from '@lib/constants';
import State from '@lib/state';

/* MAIN */

const ContainOutliner: ToolConfig<ContainOutlinerState> = {
  id: 'contain-outliner',
  name: 'Contain Outliner',
  description: 'Toggle the contain outliner, to spot missing contain enforcements (layout/paint/size/inline-size/style)',
  command: 'devbox.contain-outliner.toggle',
  shortcut: IS_MAC ? 'Ctrl+Cmd+C' : 'Ctrl+Alt+Shift+C',
  state: State.containOutliner,
  trigger: useToolTrigger ( (): Disposer => {
    State.containOutliner.active ( true );
    const dispose = useRootDispose ( useContainOutliner );
    return (): void => {
      State.containOutliner.active ( false );
      dispose ();
    };
  }, State.containOutliner.active )
};

/* EXPORT */

export default ContainOutliner;
