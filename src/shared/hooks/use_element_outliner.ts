
/* IMPORT */

import {$$} from 'voby';
import {forEachRight, traverseElement} from '../utils';
import useAnimationLoop from './use_animation_loop';
import useCanvasOverlay from './use_canvas_overlay';

/* HELPERS */

const BACKGROUNDS = ['#220A4F', '#004FD0', '#18B817', '#998F00', '#995400', '#900000', '#D0006F', '#8A2BE2', '#008080', '#FF8C00'];
const FOREGROUNDS = ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'];

/* MAIN */

const useElementOutliner = ( ref: $<Element | undefined> = document.body ): void => {

  const canvas = useCanvasOverlay ();
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

    forEachRight ( boxesFiltered, box => {

      const {element, level, rect} = box;
      const background = BACKGROUNDS[level % BACKGROUNDS.length];
      const foreground = FOREGROUNDS[level % FOREGROUNDS.length];

      ctx.strokeStyle = background;
      ctx.strokeRect ( rect.left, rect.top, rect.width, rect.height );

      const descendants = element.querySelectorAll ( '*' ).length;
      const modifier = element === canvas.parentElement ? 0 : 1; // Count itself, but not the canvas
      const count = descendants + modifier;
      const label = `${count}`;

      if ( count < 2 ) return;

      ctx.font = '10px sans-serif';

      const measure = ctx.measureText ( label );
      const width = measure.width;
      const height = 10;

      ctx.fillStyle = background;
      ctx.fillRect ( rect.left, rect.top, width + 2, height + 4 );

      ctx.fillStyle = foreground;
      ctx.fillText ( label, rect.left + 1, rect.top + height );

    });

  };

  useAnimationLoop ( () => {

    clear ();
    paint ();

  });

};

/* EXPORT */

export default useElementOutliner;
