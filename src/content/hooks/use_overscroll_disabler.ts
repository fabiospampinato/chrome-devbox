
/* IMPORT */

import useEffect from '@hooks/use_effect';
import {once} from '@utils';

/* HELPERS */

const getStylesheet = once ( (): HTMLStyleElement => {

  const style = document.createElement ( 'style' );

  style.className = 'devbox-overscroll-stylesheet';
  style.textContent = `* { overscroll-behavior: none !important; }`;

  return style;

});

const getAttachableStylesheet = (() => {

  let count = 0;

  return (): { attach: Callback, detach: Callback } => {

    const attach = (): void => {
      count += 1;
      if ( count === 1 ) {
        const style = getStylesheet ();
        document.head.appendChild ( style );
      }
    };

    const detach = (): void => {
      count -= 1;
      if ( count === 0 ) {
        const style = getStylesheet ();
        document.head.removeChild ( style );
      }
    };

    return { attach, detach };

  };

})();

/* MAIN */

const useOverscrollDisabler = (): void => {

  useEffect ( () => {

    const style = getAttachableStylesheet ();

    style.attach ();

    return (): void => {

      style.detach ();

    };

  });

};

/* EXPORT */

export default useOverscrollDisabler;
