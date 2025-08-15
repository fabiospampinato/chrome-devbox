
/* IMPORT */

import {$} from 'voby';
import useEventListener from '@hooks/use_event_listener';
import {isShallowEqual} from '@utils';

/* MAIN */

const useWindowRect = (): ObservableReadonly<BoundingBox> => {

  const top = 0;
  const right = 0;
  const bottom = 0;
  const left = 0;
  const x = 0;
  const y = 0;
  const height = window.innerHeight;
  const width = window.innerWidth;
  const dimensions = $({ top, right, bottom, left, x, y, width, height }, { equals: isShallowEqual });

  const update = (): void => {
    const height = window.innerHeight;
    const width = window.innerWidth;
    dimensions ({ top, right, bottom, left, x, y, width, height });
  };

  useEventListener ( window, 'resize', update );

  return dimensions;

};

/* EXPORT */

export default useWindowRect;
