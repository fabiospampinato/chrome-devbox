
/* IMPORT */

import ShoSho from 'shosho';
import {useTool} from '../shared/hooks';
import {ElementOutliner} from '../shared/tools';

/* HELPERS */

const toggleElementOutliner = useTool ( ElementOutliner );

/* MAIN */

const initEvents = (): void => {

  const COMMANDS = {
    [ElementOutliner.command]: toggleElementOutliner
  };

  chrome.runtime.onMessage.addListener ( command => {

    COMMANDS[command]?.();

  });

};

const initShortcuts = (): void => {

  const shortcuts = new ShoSho ({
    capture: true,
    target: document
  });

  shortcuts.register ( ElementOutliner.shortcut, toggleElementOutliner );

  shortcuts.start ();

};

const init = (): void => {

  initEvents ();
  initShortcuts ();

};

/* INIT */

init ();
