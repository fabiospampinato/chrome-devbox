
/* IMPORT */

import './styles.css';
import Tools from '@components/tools';
import ConsoleClear from '@tools/console_clear';
import DebuggerStart from '@tools/debugger_start';
import ElementOutliner from '@tools/element_outliner';
import FPSMeter from '@tools/fps_meter';
import LayerOutliner from '@tools/layer_outliner';
import PaintHighlighter from '@tools/paint_highlighter';
import Rulers from '@tools/rulers';

/* MAIN */

const Dashboard = (): JSX.Element => {

  return (
    <div class="devbox-dashboard">
      <Tools name="Actions" tools={[ConsoleClear, DebuggerStart]} />
      <Tools name="Native Tools" tools={[FPSMeter, LayerOutliner, PaintHighlighter]} />
      <Tools name="Custom Tools" tools={[ElementOutliner, Rulers]} />
    </div>
  );

};

/* EXPORT */

export default Dashboard;
