
/* IMPORT */

import isEqual from 'are-deeply-equal';

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
  forEach,
  forEachRight,
  getElementChildren,
  isEqual,
  isNil,
  isTruthy,
  traverseElement
};
