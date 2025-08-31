
/* IMPORT */

import ShoSho from 'shosho';
import EventEmitter from '@lib/event_emitter';
import Tools from '@tools';
import Dashboard from '@tools/dashboard';
import {isPlainObject} from '@utils';

/* MAIN */

const initCommands = (): void => {

  const COMMANDS: Record<string, Function> = {
    'event.trigger': EventEmitter.trigger
  };

  for ( const tool of Tools ) {

    if ( !tool.enabled ) continue;

    COMMANDS[tool.command] = tool.trigger;

  }

  chrome.runtime.onMessage.addListener ( data => {

    if ( !isPlainObject ( data ) ) return;

    const args = data['args'] ?? [];

    COMMANDS[`${data['command']}`]?.( ...args );

  });

};

const initShortcuts = (): void => {

  const shortcuts = new ShoSho ({
    capture: true,
    target: document
  });

  for ( const tool of Tools ) {

    if ( !tool.enabled ) continue;
    if ( !tool.shortcut ) continue;

    shortcuts.register ( tool.shortcut, () => {
      tool.trigger ();
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
