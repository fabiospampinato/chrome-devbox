
/* IMPORT */

import {$} from 'voby';
import useEventListener from '@hooks/use_event_listener';
import {isEqualJSON} from '@utils';

/* MAIN */

const useWindowDimensions = (): ObservableReadonly<Dimensions> => {

  const height = window.innerHeight;
  const width = window.innerWidth;
  const dimensions = $({ width, height }, { equals: isEqualJSON });

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
