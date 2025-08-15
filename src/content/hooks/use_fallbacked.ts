
/* IMPORT */

import {isFunction} from '@utils';

/* MAIN */

const useFallbacked = <T> ( observable: Observable<T>, fallback: NonNullable<T> ): ObservableLike<NonNullable<T>> => {

  function fallbacked (): NonNullable<T>;
  function fallbacked ( fn: ( value: NonNullable<T> ) => NonNullable<T> ): NonNullable<T>;
  function fallbacked ( value: NonNullable<T> ): NonNullable<T>;
  function fallbacked ( value?: any ) {

    if ( arguments.length ) {

      if ( isFunction ( value ) ) {

        return observable ( prev => value ( prev ?? fallback ) );

      } else {

        return observable ( value );

      }

    } else {

      return observable () ?? fallback;

    }

  }

  return fallbacked;

};

/* EXPORT */

export default useFallbacked;
