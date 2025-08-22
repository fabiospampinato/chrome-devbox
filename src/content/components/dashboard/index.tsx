
/* IMPORT */

import './styles.css';
import ToolButton from '@components/tool_button';
import Tools from '@components/tools';
import ConsoleClear from '@tools/console_clear';
import CpuThrottler from '@tools/cpu_throttler';
import DebuggerStart from '@tools/debugger_start';
import ElementCounter from '@tools/element_counter';
import FpsMeter from '@tools/fps_meter';
import LagRadar from '@tools/lag_radar';
import LayerOutliner from '@tools/layer_outliner';
import MutationHighlighter from '@tools/mutation_highlighter';
import PaintHighlighter from '@tools/paint_highlighter';
import Rulers from '@tools/rulers';
import ScrollBottleneckHighlighter from '@tools/scroll_bottleneck_highlighter';
import WebComponentOutliner from '@tools/web_component_outliner';

/* MAIN */

const Dashboard = (): JSX.Element => {

  return (
    <div class="devbox-dashboard">
      <Tools name="Actions">
        <ToolButton tool={ConsoleClear} />
        <ToolButton tool={DebuggerStart} />
      </Tools>
      <Tools name="Throttlers">
        <ToolButton active={CpuThrottler.state.active} tool={CpuThrottler} />
      </Tools>
      <Tools name="Native Overlays">
        <ToolButton active={FpsMeter.state.active} tool={FpsMeter} />
        <ToolButton active={LayerOutliner.state.active} tool={LayerOutliner} />
        <ToolButton active={PaintHighlighter.state.active} tool={PaintHighlighter} />
        <ToolButton active={ScrollBottleneckHighlighter.state.active} tool={ScrollBottleneckHighlighter} />
      </Tools>
      <Tools name="Custom Overlays">
        <ToolButton active={ElementCounter.state.active} tool={ElementCounter} />
        <ToolButton active={LagRadar.state.active} tool={LagRadar} />
        <ToolButton active={MutationHighlighter.state.active} tool={MutationHighlighter} />
        <ToolButton active={Rulers.state.active} tool={Rulers} />
        <ToolButton active={WebComponentOutliner.state.active} tool={WebComponentOutliner} />
      </Tools>
    </div>
  );

};

/* EXPORT */

export default Dashboard;
