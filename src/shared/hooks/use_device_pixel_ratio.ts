
/* IMPORT */

import {$} from 'voby';
import useResizeObserver from './use_resize_observer';

/* MAIN */

//TODO: Implement with a media query instead

const useDevicePixelRatio = (): ObservableReadonly<number> => {

  const devicePixelRatio = $(window.devicePixelRatio);

  useResizeObserver ( document.body, () => {

    devicePixelRatio ( window.devicePixelRatio );

  });

  return devicePixelRatio;

};

/* EXPORT */

export default useDevicePixelRatio;
