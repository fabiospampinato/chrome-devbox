
/* IMPORT */

import './styles.css';
import Tools from '@components/tools';
import ConsoleClear from '@tools/console_clear';
import CPUThrottler from '@tools/cpu_throttler';
import CustomElementOutliner from '@tools/custom_element_outliner';
import DebuggerStart from '@tools/debugger_start';
import ElementOutliner from '@tools/element_outliner';
import FPSMeter from '@tools/fps_meter';
import LagRadar from '@tools/lag_radar';
import LayerOutliner from '@tools/layer_outliner';
import MutationHighlighter from '@tools/mutation_highlighter';
import PaintHighlighter from '@tools/paint_highlighter';
import Rulers from '@tools/rulers';
import ScrollBottleneckHighlighter from '@tools/scroll_bottleneck_highlighter';

/* MAIN */

const Dashboard = (): JSX.Element => {

  return (
    <div class="devbox-dashboard">
      <Tools name="Actions" tools={[ConsoleClear, DebuggerStart]} />
      <Tools name="Native Tools" tools={[CPUThrottler, FPSMeter, LayerOutliner, PaintHighlighter, ScrollBottleneckHighlighter]} />
      <Tools name="Custom Tools" tools={[CustomElementOutliner, ElementOutliner, LagRadar, MutationHighlighter, Rulers]} />
    </div>
  );

};

/* EXPORT */

export default Dashboard;
