
/* IMPORT */

import useLagRadar from '@hooks/use_lag_radar';
import useToolTrigger from '@hooks/use_tool_trigger';

/* MAIN */

const LagRadar: ToolConfig = {
  id: 'lag-radar',
  name: 'Lag Radar',
  command: 'devbox.lag-radar.toggle',
  shortcut: 'Ctrl+Cmd+B',
  trigger: useToolTrigger ( useLagRadar )
};

/* EXPORT */

export default LagRadar;
