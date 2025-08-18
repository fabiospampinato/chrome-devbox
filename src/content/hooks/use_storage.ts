
/* IMPORT */

import {$, untrack} from 'voby';
import useEffect from '@hooks/use_effect';
import useEventListener from '@hooks/use_event_listener';
import {isEqualJSON} from '@utils';

/* MAIN */

//TODO: This shouldn't be used as is, the returned value should be matched against a schema for safety

const useStorage = <T extends JSONValue> ( storage: Storage, key: string ): Observable<T | undefined> => {

  const serialize = ( value: T | undefined ): string => JSON.stringify ( value ) ?? 'null';
  const deserialize = ( value: string ): T | undefined => JSON.parse ( value ) ?? undefined;

  const get = (): string => storage.getItem ( key ) ?? 'null';
  const set = ( value: string ): void => storage.setItem ( key, value );

  const json = $(get ());
  const value = $<T | undefined>( undefined, { equals: isEqualJSON } );

  useEventListener ( window, 'storage', ( event: StorageEvent ) => {

    if ( event.storageArea !== storage ) return;

    if ( event.key !== key ) return;

    const jsonNext = event.newValue ?? 'null';

    if ( jsonNext === json () ) return;

    json ( jsonNext );

  });

  useEffect ( () => {

    value ( deserialize ( json () ) );

  }, { sync: 'init' } );

  useEffect ( () => {

    const jsonNext = serialize ( value () );

    if ( jsonNext === untrack ( json ) ) return;

    json ( jsonNext );

    set ( jsonNext );

  });

  return value;

};

/* EXPORT */

export default useStorage;
