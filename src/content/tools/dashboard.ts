
/* IMPORT */

import DashboardComponent from '@components/dashboard';
import useToolTrigger from '@hooks/use_tool_trigger';
import usePortal from '@hooks/use_portal';

/* MAIN */

const Dashboard: ToolConfig = {
  id: 'dashboard',
  name: 'Dashboard',
  command: 'devbox.dashboard.toggle',
  shortcut: 'Ctrl+Cmd+Space',
  trigger: useToolTrigger ( () => usePortal ( DashboardComponent ) )
};

/* EXPORT */

export default Dashboard;
