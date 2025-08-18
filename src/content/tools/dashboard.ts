
/* IMPORT */

import App from '@components/app';
import useRootDispose from '@hooks/use_root_dispose';
import useToolTrigger from '@hooks/use_tool_trigger';
import usePortal from '@hooks/use_portal';
import {IS_MAC} from '@lib/constants';
import State from '@lib/state';

/* MAIN */

const Dashboard: ToolConfig<DashboardState> = {
  id: 'dashboard',
  name: 'Dashboard',
  description: 'Toggle the dashboard',
  command: 'devbox.dashboard.toggle',
  shortcut: IS_MAC ? 'Ctrl+Cmd+Space' : 'Ctrl+Alt+Shift+Space',
  state: State.dashboard,
  trigger: useToolTrigger ( (): Disposer => {
    State.dashboard.active ( true );
    const dispose = useRootDispose ( () => usePortal ( App ) );
    return (): void => {
      State.dashboard.active ( false );
      dispose ();
    };
  }, State.dashboard.active )
};

/* EXPORT */

export default Dashboard;
