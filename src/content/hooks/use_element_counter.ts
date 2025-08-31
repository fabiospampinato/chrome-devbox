
/* IMPORT */

import {$$} from 'voby';
import useAnimationLoop from '@hooks/use_animation_loop';
import useCanvasOverlay from '@hooks/use_canvas_overlay';
import Canvas from '@lib/canvas';
import {forEachRight, getElementDescendantsCount, traverseElement} from '@utils';

/* TYPES */

type Box = {
  element: Element,
  level: number,
  rect: DOMRect
};

/* HELPERS */

const BACKGROUNDS = ['#220A4F', '#004FD0', '#18B817', '#998F00', '#995400', '#900000', '#D0006F', '#8A2BE2', '#008080', '#FF8C00'];
const FOREGROUNDS = ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'];

/* MAIN */

const useElementCounter = ( ref: $<Element | undefined> = document.body ): void => {

  const canvas = useCanvasOverlay ( 'element-counter' );
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
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    traverseElement ( root, ( element, level ) => {

      if ( element === canvas ) return;

      const isSkippable = !!boxes.length;
      const rect = element.getBoundingClientRect ();

      if ( !rect.width || !rect.height ) return;
      if ( isSkippable && ( rect.top > viewportHeight || rect.bottom < 0 ) ) return;
      if ( isSkippable && ( rect.left > viewportWidth || rect.right < 0 ) ) return;

      boxes.push ({ element, level, rect });

    });

    /* FILTERING BOXES */

    const boxesIds = new Set<string>();

    const boxesFiltered = boxes.filter ( box => {

      const {top, left, width, height} = box.rect;
      const id = `${left}-${top}-${width}-${height}`;

      if ( boxesIds.has ( id ) ) return false; // This box won't be visible

      boxesIds.add ( id );

      return true;

    });

    /* PAINTING BOXES */

    const descendantsCountCache = new Map<Element, number> ();

    forEachRight ( boxesFiltered, box => {

      const {element, level, rect} = box;
      const background = BACKGROUNDS[level % BACKGROUNDS.length];
      const foreground = FOREGROUNDS[level % FOREGROUNDS.length];

      const descendants = getElementDescendantsCount ( element, descendantsCountCache );
      const modifier = element === canvas.parentElement ? 0 : 1; // Count itself, but not the canvas
      const count = descendants + modifier;
      const label = count > 1 ? `${count}` : undefined;

      Canvas.box.paint ( ctx, rect, background, foreground, label );

    });

    /* PAINTING FALLBACK */

    if ( !boxes.length ) {

      Canvas.notice.paint ( ctx, 'no elements' );

    }

  };

  useAnimationLoop ( () => {

    clear ();
    paint ();

  });

};

/* EXPORT */

export default useElementCounter;
