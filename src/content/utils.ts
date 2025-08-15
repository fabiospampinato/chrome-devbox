
/* IMPORT */

import isEqual from 'are-deeply-equal';
import memoize from 'lomemo';

/* HELPERS */

const {getPrototypeOf} = Object;
const {toString} = Object.prototype;

/* MAIN */

const attachDebugger = (() => {

  const attach = memoize ( async ( tabId: number ): Promise<void> => {

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

  });

  chrome.debugger?.onDetach.addListener ( source => {

    attach.cache.delete ( source.tabId );

  });

  return attach;

})();

const callDebugger = async ( command: string, params: Record<string, unknown> ): Promise<void> => {

  const tabId = await getCurrentTabId ();

  if ( !tabId ) return;

  await attachDebugger ( tabId );

  chrome.debugger.sendCommand ( { tabId }, command, params );

};

const callDebuggerInWorker = ( command: string, params: Record<string, unknown> ): void => {

  chrome.runtime.sendMessage ({ message: 'devbox.debugger.command', args: [command, params] });

};

const forEach = <T> ( values: T[], iterator: ( value: T, index: number ) => void ): void => {

  for ( let i = 0; i < values.length; i++ ) {

    iterator ( values[i], i );

  }

};

const forEachRight = <T> ( values: T[], iterator: ( value: T, index: number ) => void ): void => {

  for ( let i = values.length - 1; i >= 0; i-- ) {

    iterator ( values[i], i );

  }

};

const getCurrentTabId = async (): Promise<number | undefined> => {

  const [tab] = await chrome.tabs.query ({ active: true, currentWindow: true });
  const tabId = tab.id;

  return tabId;

};

const getElementChildren = ( element: Element ): Element[] => {

  let index = 0;
  let children = new Array ( element.childElementCount );
  let child = element.firstElementChild;

  while ( child ) {

    children[index++] = child;

    child = child.nextElementSibling;

  }

  return children;

};

const isNil = ( value: unknown ): value is null | undefined => {

  return value === null || value === undefined;

};

const isObjectLike = ( value: unknown ): value is object => {

  return typeof value === 'object' && value !== null;

};

const isPlainObject = ( value: unknown ): value is Record<string | number | symbol, unknown> => {

  if ( !isObjectLike ( value ) || toString.call ( value ) !== '[object Object]' ) return false;

  const prototype = getPrototypeOf ( value );

  if ( prototype === null ) return true;

  return getPrototypeOf ( prototype ) === null;

};

const isTruthy = <T> ( value: T ): value is Exclude<T, 0 | -0 | 0n | -0n | '' | false | null | undefined | void> => {

  return !!value;

};

const traverseElement = ( root: Element, iterator: ( value: Element, level: number ) => boolean | void ): void => {

  const queues: [number, Element[]][] = [[0, [root]]];

  for ( let i = 0; i < queues.length; i++ ) {

    const [level, queue] = queues[i];

    for ( let j = 0; j < queue.length; j++ ) {

      /* MAPPING */

      const element = queue[j];
      const result = iterator ( element, level );

      if ( result === false ) continue;

      /* QUEUING UP CHILDREN */

      const children = getElementChildren ( element );

      if ( children.length ) {

        queues.push ([ level + 1, children ]);

      }

    }

  }

};

/* EXPORT */

export {
  attachDebugger,
  callDebugger,
  callDebuggerInWorker,
  forEach,
  forEachRight,
  getCurrentTabId,
  getElementChildren,
  isEqual,
  isNil,
  isObjectLike,
  isPlainObject,
  isTruthy,
  memoize,
  traverseElement
};
