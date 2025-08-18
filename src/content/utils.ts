
/* IMPORT */

import cloneDeepJSON from 'json-clone-deep';
import isEqualJSON from 'json-is-sorted-equal';

/* HELPERS */

const {getPrototypeOf} = Object;
const {toString} = Object.prototype;

/* MAIN */

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

  const root = element.shadowRoot || element; // Supporting custom elements too

  let index = 0;
  let children = new Array ( root.childElementCount );
  let child = root.firstElementChild;

  while ( child ) {

    children[index++] = child;

    child = child.nextElementSibling;

  }

  return children;

};

const getElementDescendantsCount = ( element: Element, cache: Map<Element, number> ): number => {

  const cached = cache.get ( element );

  if ( cached !== undefined ) return cached;

  let count = 0;

  traverseElementChildren ( element, child => {

    count += 1 + getElementDescendantsCount ( child, cache );

  });

  cache.set ( element, count );

  return count;

};

const isElement = ( value: unknown ): value is Element => {

  return value instanceof Element;

};

const isFunction = ( value: unknown ): value is Function => {

  return typeof value === 'function';

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

const isText = ( value: unknown ): value is Text => {

  return value instanceof Text;

};

const isTruthy = <T> ( value: T ): value is Exclude<T, 0 | -0 | 0n | -0n | '' | false | null | undefined | void> => {

  return !!value;

};

const sigmoid = ( value: number ): number => {

  return 1 / ( 1 + Math.exp ( -value ) );

};

const traverseElement = ( element: Element, iterator: ( value: Element, level: number ) => boolean | void ): void => {

  const queues: [number, Element[]][] = [[0, [element]]];

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

const traverseElementChildren = ( element: Element, iterator: ( value: Element, level: number ) => boolean | void ): void => {

  const root = element.shadowRoot || element; // Supporting custom elements too

  let child = root.firstElementChild;

  while ( child ) {

    const result = iterator ( child, 0 );

    if ( result === false ) return;

    child = child.nextElementSibling;

  }

};

/* EXPORT */

export {
  cloneDeepJSON,
  forEach,
  forEachRight,
  getCurrentTabId,
  getElementChildren,
  getElementDescendantsCount,
  isElement,
  isEqualJSON,
  isFunction,
  isNil,
  isObjectLike,
  isPlainObject,
  isText,
  isTruthy,
  sigmoid,
  traverseElement,
  traverseElementChildren
};
