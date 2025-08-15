
/* IMPORT */

import useCleanup from '@hooks/use_cleanup';
import useRoot from '@hooks/use_root';

/* TYPES */

type Singleton<T> = {
  instances: number,
  value: T,
  dispose: Callback
};

/* MAIN */

function useSingleton <R> ( fn: () => R ): (() => R);
function useSingleton <T, R> ( fn: ( arg?: T ) => R ): (( arg?: T ) => R);
function useSingleton <T, R> ( fn: ( arg: T ) => R ): (( arg: T ) => R);
function useSingleton <T, R> ( fn: ( arg?: T ) => R ) {

  const singletons = new Map<T | undefined, Singleton<R>>();

  const getSingleton = ( arg?: T ): Singleton<R> => {

    const cached = singletons.get ( arg );

    if ( cached ) return cached;

    const instances = 0;
    const [value, dispose] = useRoot ( dispose => [fn ( arg ), dispose] );
    const singleton = { instances, value, dispose };

    singletons.set ( arg, singleton );

    return singleton;

  };

  return ( arg?: T ): R => {

    const singleton = getSingleton ( arg );

    singleton.instances += 1;

    useCleanup ( () => {

      singleton.instances -= 1;

      queueMicrotask ( () => { // Potential performance optimization, if cleanup -> creation is done in the same tick

        if ( singleton.instances ) return;

        singleton.dispose ();

        singletons.delete ( arg );

      });

    });

    return singleton.value;

  };

}

/* EXPORT */

export default useSingleton;
