
/* IMPORT */

import ShoSho from 'shosho';
import EventEmitter from '@lib/event_emitter';
import ConsoleClear from '@tools/console_clear';
import ContainmentOutliner from '@tools/containment_outliner';
import CpuThrottler from '@tools/cpu_throttler';
import Dashboard from '@tools/dashboard';
import DebuggerStart from '@tools/debugger_start';
import ElementCounter from '@tools/element_counter';
import ElementOutliner from '@tools/element_outliner';
import ExtensionReloader from '@tools/extension_reloader';
import FpsMeter from '@tools/fps_meter';
import LagRadar from '@tools/lag_radar';
import LayerOutliner from '@tools/layer_outliner';
import MutationHighlighter from '@tools/mutation_highlighter';
import OverflowOutliner from '@tools/overflow_outliner';
import PaintHighlighter from '@tools/paint_highlighter';
import Rulers from '@tools/rulers';
import ScrollBottleneckHighlighter from '@tools/scroll_bottleneck_highlighter';
import WebComponentOutliner from '@tools/web_component_outliner';
import {isPlainObject} from '@utils';

/* MAIN */

const initCommands = (): void => {

  const COMMANDS = {
    'event.trigger': EventEmitter.trigger,
    [ConsoleClear.command]: ConsoleClear.trigger,
    [ContainmentOutliner.command]: ContainmentOutliner.trigger,
    [CpuThrottler.command]: CpuThrottler.trigger,
    [Dashboard.command]: Dashboard.trigger,
    [DebuggerStart.command]: DebuggerStart.trigger,
    [ElementCounter.command]: ElementCounter.trigger,
    [ElementOutliner.command]: ElementOutliner.trigger,
    [ExtensionReloader.command]: ExtensionReloader.trigger,
    [FpsMeter.command]: FpsMeter.trigger,
    [LagRadar.command]: LagRadar.trigger,
    [LayerOutliner.command]: LayerOutliner.trigger,
    [MutationHighlighter.command]: MutationHighlighter.trigger,
    [OverflowOutliner.command]: OverflowOutliner.trigger,
    [PaintHighlighter.command]: PaintHighlighter.trigger,
    [Rulers.command]: Rulers.trigger,
    [ScrollBottleneckHighlighter.command]: ScrollBottleneckHighlighter.trigger,
    [WebComponentOutliner.command]: WebComponentOutliner.trigger
  };

  chrome.runtime.onMessage.addListener ( data => {

    if ( !isPlainObject ( data ) ) return;

    const args = data['args'] ?? [];

    COMMANDS[`${data['command']}`]?.( ...args );

  });

};

const initShortcuts = (): void => {

  const SHORTCUTS = {
    [ConsoleClear.shortcut]: ConsoleClear.trigger,
    [ContainmentOutliner.shortcut]: ContainmentOutliner.trigger,
    [CpuThrottler.shortcut]: CpuThrottler.trigger,
    [Dashboard.shortcut]: Dashboard.trigger,
    [DebuggerStart.shortcut]: DebuggerStart.trigger,
    [ElementCounter.shortcut]: ElementCounter.trigger,
    [ElementOutliner.shortcut]: ElementOutliner.trigger,
    [ExtensionReloader.shortcut]: ExtensionReloader.trigger,
    [FpsMeter.shortcut]: FpsMeter.trigger,
    [LagRadar.shortcut]: LagRadar.trigger,
    [LayerOutliner.shortcut]: LayerOutliner.trigger,
    [MutationHighlighter.shortcut]: MutationHighlighter.trigger,
    [OverflowOutliner.shortcut]: OverflowOutliner.trigger,
    [PaintHighlighter.shortcut]: PaintHighlighter.trigger,
    [Rulers.shortcut]: Rulers.trigger,
    [ScrollBottleneckHighlighter.shortcut]: ScrollBottleneckHighlighter.trigger,
    [WebComponentOutliner.shortcut]: WebComponentOutliner.trigger
  };

  const shortcuts = new ShoSho ({
    capture: true,
    target: document
  });

  for ( const [shortcut, action] of Object.entries ( SHORTCUTS ) ) {

    if ( !shortcut ) continue;

    shortcuts.register ( shortcut, () => {
      action ();
      return true;
    });

  }

  shortcuts.start ();

};

const init = (): void => {

  initCommands ();
  initShortcuts ();

};

/* INIT */

init ();
