
/* IMPORT */

import {$$} from 'voby';
import useAnimationLoop from '@hooks/use_animation_loop';
import useCanvasOverlay from '@hooks/use_canvas_overlay';
import Canvas from '@lib/canvas';
import {forEachRight, traverseElement} from '@utils';

/* TYPES */

type Box = {
  element: Element,
  level: number,
  rect: DOMRect,
  overflow: string
};

/* HELPERS */

const BACKGROUND = '#220A4F';
const FOREGROUND = '#FFFFFF';

const BACKGROUNDS_BY_VALUE: Partial<Record<string, string>> = {
  visible: '#900000',
  hidden: '#18B817',
  clip: '#998F00',
  scroll: '#FF8C00',
  auto: '#8A2BE2',
  'hidden auto': '#004FD0',
  'hidden scroll': '#004FD0',
  'scroll hidden': '#004FD0',
  'auto hidden': '#004FD0',
};

/* MAIN */

const useOverflowOutliner = ( ref: $<Element | undefined> = document.body, filter: ( element: Element ) => boolean = () => true ): void => {

  const canvas = useCanvasOverlay ( 'overflow-outliner' );
  const ctx = canvas.getContext ( '2d' );

  if ( !ctx ) return;

  const clear = (): void => {

    ctx.clearRect ( 0, 0, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER );

  };

  const paint = (): void => {

    const root = $$(ref);

    if ( !root ) return;

    /* COMPUTING BOXES */

    const boxes: Box[] = [];
    const viewportHeight = window.outerHeight;
    const viewportWidth = window.outerWidth;

    traverseElement ( root, ( element, level ) => {

      if ( element === canvas ) return;

      const rect = element.getBoundingClientRect ();

      if ( !rect.width || !rect.height ) return;
      if ( rect.top > viewportHeight || rect.bottom < 0 ) return;
      if ( rect.left > viewportWidth || rect.right < 0 ) return;

      const style = getComputedStyle ( element );
      const overflow = style.getPropertyValue ( 'overflow' );

      boxes.push ({ element, level, rect, overflow });

    });

    /* PAINTING BOXES */

    forEachRight ( boxes, box => {

      const {rect, overflow} = box;
      const label = overflow;
      const background = BACKGROUNDS_BY_VALUE[overflow] ?? BACKGROUND;
      const foreground = FOREGROUND;

      Canvas.box.paint ( ctx, rect, background, foreground, label );

    });

  };

  useAnimationLoop ( () => {

    clear ();
    paint ();

  });

};

/* EXPORT */

export default useOverflowOutliner;
