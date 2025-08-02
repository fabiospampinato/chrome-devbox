
/* IMPORT */

import {$} from 'voby';
import {isEqual} from '../utils';
import useEventListener from './use_event_listener';

/* MAIN */

const useWindowDimensions = (): ObservableReadonly<{ width: number; height: number }> => {

  const height = window.innerHeight;
  const width = window.innerWidth;
  const dimensions = $({ width, height }, { equals: isEqual });

  const update = (): void => {
    const height = window.innerHeight;
    const width = window.innerWidth;
    dimensions ({ width, height });
  };

  useEventListener ( window, 'resize', update );

  return dimensions;

};

/* EXPORT */

export default useWindowDimensions;
