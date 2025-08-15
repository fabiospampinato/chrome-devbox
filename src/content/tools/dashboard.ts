
/* IMPORT */

import DashboardComponent from '@components/dashboard';
import useTool from '@hooks/use_tool';
import usePortal from '@hooks/use_portal';

/* MAIN */

const Dashboard: ToolConfig = {
  id: 'dashboard',
  name: 'Dashboard',
  command: 'devbox.dashboard.toggle',
  shortcut: 'Ctrl+Cmd+Space',
  trigger: useTool ( () => usePortal ( DashboardComponent ) )
};

/* EXPORT */

export default Dashboard;
