
/* IMPORT */

import {render} from 'voby';
import useCleanup from '@hooks/use_cleanup';

/* MAIN */

const usePortal = ( children: () => JSX.Element ): Disposer => {

  const mount = document.body;
  const wrapper = document.createElement ( 'div' );

  wrapper.className = 'devbox-portal-root';
  mount.appendChild ( wrapper );

  const attach = (): Disposer => {

    mount.appendChild ( wrapper );
    const dispose = render ( children, wrapper );

    return (): void => {

      dispose ();
      wrapper.remove ();

    };

  };

  const detach = attach ();

  useCleanup ( detach );

  return detach;

};

/* EXPORT */

export default usePortal;
