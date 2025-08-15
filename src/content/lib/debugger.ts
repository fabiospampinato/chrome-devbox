
/* IMPORT */

import {getCurrentTabId} from '@utils';

/* HELPERS */

const DebuggerReferenceCounts = new Map<number, number>();

/* MAIN */

const Debugger = {

  attach: ( tabId: number ): Promise<void> => {

    return new Promise ( ( resolve, reject ) => {

      chrome.debugger.attach ( { tabId }, '1.3', () => {

        if ( chrome.runtime.lastError ) {

          console.error ( chrome.runtime.lastError );

          reject ( chrome.runtime.lastError );

        } else {

          resolve ();

        }

      });

    });

  },

  call: async ( command: string, params: Record<string, unknown>, refCountModifier: number ): Promise<void> => {

    const tabId = await getCurrentTabId ();

    if ( !tabId ) return;

    const refCount = DebuggerReferenceCounts.get ( tabId ) ?? 0;
    const refCountNext = Math.max ( 0, refCount + refCountModifier );

    DebuggerReferenceCounts.set ( tabId, refCountNext );

    if ( refCount > 0 && refCountNext <= 0 ) { // We no longer need the debugger, detaching it

      await Debugger.detach ( tabId );

    } else if ( refCount <= 0 && refCountNext > 0 ) { // We now need the debugger, attaching it

      await Debugger.attach ( tabId );

    }

    if ( refCountNext >= 1 ) { // We need to actually execute the command

      await chrome.debugger.sendCommand ( { tabId }, command, params );

    }

  },

  callInWorker: ( command: string, params: Record<string, unknown>, refCountModifier: number ): void => {

    chrome.runtime.sendMessage ({ message: 'devbox.debugger.command', command, params, refCountModifier });

  },

  detach: ( tabId: number ): Promise<void> => {

    return new Promise ( ( resolve, reject ) => {

      chrome.debugger.detach ( { tabId }, () => {

        if ( chrome.runtime.lastError ) {

          console.error ( chrome.runtime.lastError );

          reject ( chrome.runtime.lastError );

        } else {

          resolve ();

        }

      });

    });

  },

  init: (): void => {

    // Resetting on detach, which could also happen externally

    chrome.debugger.onDetach.addListener ( source => {

      DebuggerReferenceCounts.delete ( source.tabId ?? -1 );

    });

  }

};

/* EXPORT */

export default Debugger;
