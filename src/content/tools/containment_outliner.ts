
/* IMPORT */

import useContainmentOutliner from '@hooks/use_containment_outliner';
import useRootDispose from '@hooks/use_root_dispose';
import useToolTrigger from '@hooks/use_tool_trigger';
import {IS_MAC} from '@lib/constants';
import State from '@lib/state';

/* MAIN */

const ContainmentOutliner: ToolConfig<ContainmentOutlinerState> = {
  id: 'containment-outliner',
  name: 'Containment Outliner',
  description: 'Toggle the containment outliner, to spot missing containment enforcements (layout/paint/size/inline-size/style)',
  command: 'devbox.containment-outliner.toggle',
  shortcut: IS_MAC ? 'Ctrl+Cmd+C' : 'Ctrl+Alt+Shift+C',
  state: State.containmentOutliner,
  trigger: useToolTrigger ( (): Disposer => {
    State.containmentOutliner.active ( true );
    const dispose = useRootDispose ( useContainmentOutliner );
    return (): void => {
      State.containmentOutliner.active ( false );
      dispose ();
    };
  }, State.containmentOutliner.active )
};

/* EXPORT */

export default ContainmentOutliner;
