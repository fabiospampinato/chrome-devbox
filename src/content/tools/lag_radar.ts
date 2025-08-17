
/* IMPORT */

import {$} from 'voby';
import useLagRadar from '@hooks/use_lag_radar';
import useRootDispose from '@hooks/use_root_dispose';
import useToolTrigger from '@hooks/use_tool_trigger';

/* MAIN */

const LagRadar: ToolConfig = {
  id: 'lag-radar',
  name: 'Lag Radar',
  description: 'Toggle the lag radar, to spot smoothness issues in the page',
  command: 'devbox.lag-radar.toggle',
  shortcut: 'Ctrl+Cmd+B',
  active: $(false),
  trigger: useToolTrigger ( (): Disposer => {
    LagRadar.active?.( true );
    const dispose = useRootDispose ( useLagRadar );
    return (): void => {
      LagRadar.active?.( false );
      dispose ();
    };
  })
};

/* EXPORT */

export default LagRadar;
