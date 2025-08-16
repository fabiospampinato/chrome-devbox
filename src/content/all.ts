
/* IMPORT */

import ShoSho from 'shosho';
import ConsoleClear from '@tools/console_clear';
import Dashboard from '@tools/dashboard';
import DebuggerStart from '@tools/debugger_start';
import ElementOutliner from '@tools/element_outliner';
import FPSMeter from '@tools/fps_meter';
import LayerOutliner from '@tools/layer_outliner';
import PaintHighlighter from '@tools/paint_highlighter';
import Rulers from '@tools/rulers';
import {isPlainObject} from '@utils';

/* MAIN */

const initCommands = (): void => {

  const COMMANDS = {
    [ConsoleClear.command]: ConsoleClear.trigger,
    [Dashboard.command]: Dashboard.trigger,
    [DebuggerStart.command]: DebuggerStart.trigger,
    [ElementOutliner.command]: ElementOutliner.trigger,
    [FPSMeter.command]: FPSMeter.trigger,
    [LayerOutliner.command]: LayerOutliner.trigger,
    [PaintHighlighter.command]: PaintHighlighter.trigger,
    [Rulers.command]: Rulers.trigger
  };

  chrome.runtime.onMessage.addListener ( data => {

    if ( !isPlainObject ( data ) ) return;

    COMMANDS[`${data['command']}`]?.();

  });

};

const initShortcuts = (): void => {

  const SHORTCUTS = {
    [ConsoleClear.shortcut]: ConsoleClear.trigger,
    [Dashboard.shortcut]: Dashboard.trigger,
    [DebuggerStart.shortcut]: DebuggerStart.trigger,
    [ElementOutliner.shortcut]: ElementOutliner.trigger,
    [FPSMeter.shortcut]: FPSMeter.trigger,
    [LayerOutliner.shortcut]: LayerOutliner.trigger,
    [PaintHighlighter.shortcut]: PaintHighlighter.trigger,
    [Rulers.shortcut]: Rulers.trigger
  };

  const shortcuts = new ShoSho ({
    capture: true,
    target: document
  });

  for ( const [shortcut, action] of Object.entries ( SHORTCUTS ) ) {

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
