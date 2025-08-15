
/* IMPORT */

import {$} from 'voby';
import useEventListener from '@hooks/use_event_listener';
import {isEqual} from '@utils';

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
