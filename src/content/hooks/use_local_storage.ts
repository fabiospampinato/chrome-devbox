
/* IMPORT */

import useSingleton from '@hooks/use_singleton';
import useStorage from '@hooks/use_storage';

/* MAIN */

const useLocalStorage = <T extends JSONValue> ( key: string ): Observable<T | undefined> => {

  return useStorage ( localStorage, key );

};

/* EXPORT */

export default useSingleton ( useLocalStorage );
