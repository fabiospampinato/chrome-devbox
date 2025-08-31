
/* IMPORT */

import ConsoleClear from '@tools/console_clear';
import ContainmentOutliner from '@tools/containment_outliner';
import CpuThrottler from '@tools/cpu_throttler';
import Dashboard from '@tools/dashboard';
import DebuggerStart from '@tools/debugger_start';
import DisplayOutliner from '@tools/display_outliner';
import ElementCounter from '@tools/element_counter';
import ElementOutliner from '@tools/element_outliner';
import ExtensionReloader from '@tools/extension_reloader';
import FpsMeter from '@tools/fps_meter';
import IntrinsicSizeOutliner from '@tools/intrinsic_size_outliner';
import LagRadar from '@tools/lag_radar';
import LayerOutliner from '@tools/layer_outliner';
import MutationHighlighter from '@tools/mutation_highlighter';
import OverflowOutliner from '@tools/overflow_outliner';
import PaintHighlighter from '@tools/paint_highlighter';
import Rulers from '@tools/rulers';
import ScrollBottleneckHighlighter from '@tools/scroll_bottleneck_highlighter';
import WebComponentOutliner from '@tools/web_component_outliner';

/* MAIN */

const Tools: ToolConfig[] = [
  ConsoleClear,
  ContainmentOutliner,
  CpuThrottler,
  Dashboard,
  DebuggerStart,
  DisplayOutliner,
  ElementCounter,
  ElementOutliner,
  ExtensionReloader,
  FpsMeter,
  IntrinsicSizeOutliner,
  LagRadar,
  LayerOutliner,
  MutationHighlighter,
  OverflowOutliner,
  PaintHighlighter,
  Rulers,
  ScrollBottleneckHighlighter,
  WebComponentOutliner
];

/* EXPORT */

export default Tools;
