
/* IMPORT */

import DashboardComponent from '@components/dashboard';
import useRootDispose from '@hooks/use_root_dispose';
import useToolTrigger from '@hooks/use_tool_trigger';
import usePortal from '@hooks/use_portal';
import State from '@lib/state';

/* MAIN */

const Dashboard: ToolConfig<DashboardState> = {
  id: 'dashboard',
  name: 'Dashboard',
  description: 'Toggle the dashboard',
  command: 'devbox.dashboard.toggle',
  shortcut: 'Ctrl+Cmd+Space',
  state: State.dashboard,
  trigger: useToolTrigger ( (): Disposer => {
    Dashboard.state.active ( true );
    const dispose = useRootDispose ( () => usePortal ( DashboardComponent ) );
    return (): void => {
      Dashboard.state.active ( false );
      dispose ();
    };
  })
};

/* EXPORT */

export default Dashboard;
