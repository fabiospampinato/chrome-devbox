
/* IMPORT */

import useRoot from '@hooks/use_root';

/* MAIN */

const useRootDispose = ( fn: () => void ): Disposer => {

  return useRoot ( dispose => {

    fn ();

    return dispose;

  });

};

/* EXPORT */

export default useRootDispose;
