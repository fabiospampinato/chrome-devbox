
/* IMPORT */

import Debugger from '@lib/debugger';
import {getCurrentTabId, isPlainObject} from '@utils';

/* MAIN */

const initAction = (): void => {

  chrome.action.onClicked.addListener ( async () => {

    const tabId = await getCurrentTabId ();

    if ( !tabId ) return;

    chrome.tabs.sendMessage ( tabId, { command: 'devbox.dashboard.toggle' } );

  });

};

const initDebugger = (): void => {

  Debugger.init ();

  chrome.runtime.onMessage.addListener ( data => {

    if ( !isPlainObject ( data ) ) return;

    if ( data['message'] === 'devbox.debugger.command' ) {

      Debugger.call ( data['command'], data['params'], data['refCountModifier'] );

    }

  });

};

const init = (): void => {

  initAction ();
  initDebugger ();

};

/* INIT */

init ();
