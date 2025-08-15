
/* IMPORT */

import {callDebugger, getCurrentTabId, isPlainObject} from '@utils';

/* MAIN */

const initAction = (): void => {

  chrome.action.onClicked.addListener ( async () => {

    const tabId = await getCurrentTabId ();

    if ( !tabId ) return;

    chrome.tabs.sendMessage ( tabId, { command: 'devbox.dashboard.toggle' } );

  });

};

const initDebugger = (): void => {

  chrome.runtime.onMessage.addListener ( data => {

    if ( !isPlainObject ( data ) ) return;

    if ( data['message'] === 'devbox.debugger.command' ) {

      callDebugger ( data['args'][0], data['args'][1] );

    }

  });

};

const init = (): void => {

  initAction ();
  initDebugger ();

};

/* INIT */

init ();
