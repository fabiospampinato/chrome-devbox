
/* IMPORT */

import {$} from 'voby';
import useEventListener from './use_event_listener';

/* MAIN */

const useDevicePixelRatio = (): ObservableReadonly<number> => {

  const devicePixelRatio = $(window.devicePixelRatio);

  const update = (): void => {
    devicePixelRatio(window.devicePixelRatio);
  };

  useEventListener ( window, 'resize', update );

  return devicePixelRatio;

};

/* EXPORT */

export default useDevicePixelRatio;
