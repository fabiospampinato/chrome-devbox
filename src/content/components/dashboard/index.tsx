
/* IMPORT */

import './styles.css';
import ToolButton from '@components/tool_button';
import ToolButtons from '@components/tool_buttons';
import ElementOutliner from '@tools/element_outliner';
import FPSMeter from '@tools/fps_meter';
import LayerOutliner from '@tools/layer_outliner';
import PaintHighlighter from '@tools/paint_highlighter';
import Rulers from '@tools/rulers';

/* MAIN */

const Dashboard = (): JSX.Element => {

  return (
    <div class="devbox-dashboard">
      <ToolButtons>
        <ToolButton tool={ElementOutliner} />
        <ToolButton tool={FPSMeter} />
        <ToolButton tool={LayerOutliner} />
        <ToolButton tool={PaintHighlighter} />
        <ToolButton tool={Rulers} />
      </ToolButtons>
    </div>
  );

};

/* EXPORT */

export default Dashboard;
