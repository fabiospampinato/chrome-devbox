
/* IMPORT */

import isEqual from 'are-deeply-equal';

/* MAIN */

const findChildElement = ( parent: Element, iterator: ( value: Element ) => boolean ): Element | undefined => {

  let node = parent.firstElementChild;

  while ( node ) {

    if ( iterator ( node ) ) return node;

    node = node.nextElementSibling;

  }

  return;

};

const isTruthy = <T> ( value: T ): value is Exclude<T, 0 | -0 | 0n | -0n | '' | false | null | undefined | void> => {

  return !!value;

};

/* EXPORT */

export {
  findChildElement,
  isEqual,
  isTruthy,
};
