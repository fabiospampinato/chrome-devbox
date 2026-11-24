
/* IMPORT */

import './styles.css';
import ToolButton from '@components/tool_button';
import Tools from '@components/tools';
import ConsoleClear from '@tools/console_clear';
import ContainmentOutliner from '@tools/containment_outliner';
import CpuThrottler from '@tools/cpu_throttler';
import DebuggerStart from '@tools/debugger_start';
import DisplayOutliner from '@tools/display_outliner';
import ElementCounter from '@tools/element_counter';
import ElementOutliner from '@tools/element_outliner';
import FpsMeter from '@tools/fps_meter';
import IntrinsicSizeOutliner from '@tools/intrinsic_size_outliner';
import LagRadar from '@tools/lag_radar';
import LayerOutliner from '@tools/layer_outliner';
import MutationHighlighter from '@tools/mutation_highlighter';
import OverflowOutliner from '@tools/overflow_outliner';
import PaintHighlighter from '@tools/paint_highlighter';
import PointerHighlighter from '@tools/pointer_highlighter';
import PseudoElementCounter from '@tools/pseudo_element_counter';
import PseudoElementOutliner from '@tools/pseudo_element_outliner';
import Rulers from '@tools/rulers';
import ScrollBottleneckHighlighter from '@tools/scroll_bottleneck_highlighter';
import SizeOutliner from '@tools/size_outliner';
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
        <ToolButton active={ContainmentOutliner.state.active} tool={ContainmentOutliner} />
        <ToolButton active={DisplayOutliner.state.active} tool={DisplayOutliner} />
        <ToolButton active={ElementCounter.state.active} tool={ElementCounter} />
        <ToolButton active={ElementOutliner.state.active} tool={ElementOutliner} />
        <ToolButton active={IntrinsicSizeOutliner.state.active} tool={IntrinsicSizeOutliner} />
        <ToolButton active={LagRadar.state.active} tool={LagRadar} />
        <ToolButton active={MutationHighlighter.state.active} tool={MutationHighlighter} />
        <ToolButton active={OverflowOutliner.state.active} tool={OverflowOutliner} />
        <ToolButton active={PointerHighlighter.state.active} tool={PointerHighlighter} />
        <ToolButton active={PseudoElementCounter.state.active} tool={PseudoElementCounter} />
        <ToolButton active={PseudoElementOutliner.state.active} tool={PseudoElementOutliner} />
        <ToolButton active={Rulers.state.active} tool={Rulers} />
        <ToolButton active={SizeOutliner.state.active} tool={SizeOutliner} />
        <ToolButton active={WebComponentOutliner.state.active} tool={WebComponentOutliner} />
      </Tools>
    </div>
  );

};

/* EXPORT */

export default Dashboard;
