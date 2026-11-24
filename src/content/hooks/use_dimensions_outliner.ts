
/* IMPORT */

import {$$} from 'voby';
import useCanvasOverlayRenderLoop from '@hooks/use_canvas_overlay_render_loop';
import Canvas from '@lib/canvas';
import {forEachRight, traverseElement} from '@utils';

/* TYPES */

type Box = {
  level: number,
  rect: DOMRect
};

/* HELPERS */

const BACKGROUNDS = ['#220A4F', '#004FD0', '#18B817', '#998F00', '#995400', '#900000', '#D0006F', '#8A2BE2', '#008080', '#FF8C00'];
const FOREGROUNDS = ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'];

/* MAIN */

const useDimensionsOutliner = ( ref: $<Element | undefined> = document.body ): void => {

  useCanvasOverlayRenderLoop ( 'dimensions-outliner', ( canvas, ctx ) => {

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

      boxes.push ({ level, rect });

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

      const {level, rect} = box;
      const background = BACKGROUNDS[level % BACKGROUNDS.length];
      const foreground = FOREGROUNDS[level % FOREGROUNDS.length];
      const width = Math.round ( rect.width * 10 ) / 10;
      const height = Math.round ( rect.height * 10 ) / 10;
      const label = `${width}x${height}`;

      Canvas.box.paint ( ctx, rect, background, foreground, label );

    });

    /* PAINTING FALLBACK */

    if ( !boxes.length ) {

      Canvas.notice.paint ( ctx, 'no elements' );

    }

  });

};

/* EXPORT */

export default useDimensionsOutliner;
