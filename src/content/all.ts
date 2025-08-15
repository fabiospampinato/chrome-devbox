
/* IMPORT */

import ShoSho from 'shosho';
import Dashboard from '@tools/dashboard';
import ElementOutliner from '@tools/element_outliner';

/* MAIN */

const initCommands = (): void => {

  const COMMANDS = {
    [Dashboard.command]: Dashboard.trigger,
    [ElementOutliner.command]: ElementOutliner.trigger
  };

  chrome.runtime.onMessage.addListener ( command => {

    COMMANDS[command]?.();

  });

};

const initShortcuts = (): void => {

  const SHORTCUTS = {
    [Dashboard.shortcut]: Dashboard.trigger,
    [ElementOutliner.shortcut]: ElementOutliner.trigger
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
