
/* IMPORT */

import Debugger from '@lib/debugger';
import RPC from '@lib/rpc_backend';
import {getCurrentTabId} from '@utils';

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

};

const initRPC = (): void => {

  RPC.init ();

};

const init = (): void => {

  initAction ();
  initDebugger ();
  initRPC ();

};

/* INIT */

init ();
