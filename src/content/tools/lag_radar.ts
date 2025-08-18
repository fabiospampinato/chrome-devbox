
/* IMPORT */

import useLagRadar from '@hooks/use_lag_radar';
import useRootDispose from '@hooks/use_root_dispose';
import useToolTrigger from '@hooks/use_tool_trigger';
import State from '@lib/state';

/* MAIN */

const LagRadar: ToolConfig<LagRadarState> = {
  id: 'lag-radar',
  name: 'Lag Radar',
  description: 'Toggle the lag radar, to spot smoothness issues in the page',
  command: 'devbox.lag-radar.toggle',
  shortcut: 'Ctrl+Cmd+B',
  state: State.lagRadar,
  trigger: useToolTrigger ( (): Disposer => {
    State.lagRadar.active ( true );
    const dispose = useRootDispose ( useLagRadar );
    return (): void => {
      State.lagRadar.active ( false );
      dispose ();
    };
  }, State.lagRadar.active )
};

/* EXPORT */

export default LagRadar;
