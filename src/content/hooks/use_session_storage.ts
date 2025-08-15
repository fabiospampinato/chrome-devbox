
/* IMPORT */

import useStorage from '@hooks/use_storage';
import useSingleton from '@hooks/use_singleton';

/* MAIN */

const useSessionStorage = <T extends JSONValue> ( key: string ): Observable<T | undefined> => {

  return useStorage ( sessionStorage, key );

};

/* EXPORT */

export default useSingleton ( useSessionStorage );
