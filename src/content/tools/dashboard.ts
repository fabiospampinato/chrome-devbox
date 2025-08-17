
/* IMPORT */

import {$} from 'voby';
import DashboardComponent from '@components/dashboard';
import useRootDispose from '@hooks/use_root_dispose';
import useToolTrigger from '@hooks/use_tool_trigger';
import usePortal from '@hooks/use_portal';

/* MAIN */

const Dashboard: ToolConfig = {
  id: 'dashboard',
  name: 'Dashboard',
  description: 'Toggle the dashboard',
  command: 'devbox.dashboard.toggle',
  shortcut: 'Ctrl+Cmd+Space',
  active: $(false),
  trigger: useToolTrigger ( (): Disposer => {
    Dashboard.active?.( true );
    const dispose = useRootDispose ( () => usePortal ( DashboardComponent ) );
    return (): void => {
      Dashboard.active?.( false );
      dispose ();
    };
  })
};

/* EXPORT */

export default Dashboard;
