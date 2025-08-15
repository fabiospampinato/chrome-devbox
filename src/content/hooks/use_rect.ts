
/* IMPORT */

import {$, $$} from 'voby';
import useEffect from '@hooks/use_effect';
import useEventListener from '@hooks/use_event_listener';
import useResizeObserver from '@hooks/use_resize_observer';
import {isShallowEqual} from '@utils';

/* MAIN */

const useRect = ( ref: $<Element | undefined> ): ObservableReadonly<BoundingBox> => {

  const rect = $<BoundingBox>({ bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0, x: 0, y: 0 }, { equals: isShallowEqual });

  useEffect ( () => {

    const target = $$(ref);

    if ( !target ) return;

    const get = () => target.getBoundingClientRect ();
    const update = () => rect ( get () );

    update ();

    useEventListener ( window, 'scroll', update, { capture: true, passive: true } );
    useResizeObserver ( target, update );

  });

  return rect;

};

/* EXPORT */

export default useRect;
