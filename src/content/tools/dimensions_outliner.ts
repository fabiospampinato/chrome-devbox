
/* IMPORT */

import useDimensionsOutliner from '@hooks/use_dimensions_outliner';
import useRootDispose from '@hooks/use_root_dispose';
import useToolTrigger from '@hooks/use_tool_trigger';
import {IS_MAC} from '@lib/constants';
import State from '@lib/state';

/* MAIN */

const DimensionsOutliner: ToolConfig<DimensionsOutlinerState> = {
  id: 'dimensions-outliner',
  name: 'Dimensions Outliner',
  description: 'Toggle the dimensions outliner, to see the measured dimensions of every element in the page',
  enabled: true,
  command: 'devbox.dimensions-outliner.toggle',
  shortcut: IS_MAC ? 'Ctrl+Cmd+N' : 'Ctrl+Alt+Shift+N',
  state: State.dimensionsOutliner,
  trigger: useToolTrigger ( (): Disposer => {
    State.dimensionsOutliner.active ( true );
    const dispose = useRootDispose ( useDimensionsOutliner );
    return (): void => {
      State.dimensionsOutliner.active ( false );
      dispose ();
    };
  }, State.dimensionsOutliner.active )
};

/* EXPORT */

export default DimensionsOutliner;
