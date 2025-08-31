
/* IMPORT */

import {$$} from 'voby';
import useCanvasOverlayRenderLoop from '@hooks/use_canvas_overlay_render_loop';
import Canvas from '@lib/canvas';
import {forEachRight, traverseElement} from '@utils';

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

const useElementOutlinerBy = ( ref: $<Element | undefined> = document.body, filter: ( element: Element ) => boolean, fallback: string ): void => {

  useCanvasOverlayRenderLoop ( 'element-outliner-by', ( canvas, ctx ) => {

    const root = $$(ref);

    if ( !root ) return;

    /* COMPUTING BOXES */

    const boxes: Box[] = [];
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    traverseElement ( root, ( element, level ) => {

      if ( element === canvas ) return;

      if ( !filter ( element ) ) return; // Filtered out

      const isSkippable = !!boxes.length;
      const rect = element.getBoundingClientRect ();

      if ( !rect.width || !rect.height ) return;
      if ( isSkippable && ( rect.top > viewportHeight || rect.bottom < 0 ) ) return;
      if ( isSkippable && ( rect.left > viewportWidth || rect.right < 0 ) ) return;

      boxes.push ({ element, level, rect });

    });

    /* PAINTING BOXES */

    forEachRight ( boxes, box => {

      const {element, level, rect} = box;
      const background = BACKGROUNDS[level % BACKGROUNDS.length];
      const foreground = FOREGROUNDS[level % FOREGROUNDS.length];
      const label = element.tagName.toLowerCase ();

      Canvas.box.paint ( ctx, rect, background, foreground, label );

    });

    /* PAINTING FALLBACK */

    if ( !boxes.length ) {

      Canvas.notice.paint ( ctx, fallback );

    }

  });

};

/* EXPORT */

export default useElementOutlinerBy;
