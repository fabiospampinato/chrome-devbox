
/* IMPORT */

import './styles.css';
import ToolButton from '@components/tool_button';
import ToolButtons from '@components/tool_buttons';
import ElementOutliner from '@tools/element_outliner';

/* MAIN */

const Dashboard = (): JSX.Element => {

  return (
    <div autofocus class="devbox-dashboard" tabIndex={0}>
      <ToolButtons>
        <ToolButton tool={ElementOutliner} />
      </ToolButtons>
    </div>
  );

};

/* EXPORT */

export default Dashboard;
