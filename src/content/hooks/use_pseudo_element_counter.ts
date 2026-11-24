
/* IMPORT */

import {$$} from 'voby';
import useCanvasOverlayRenderLoop from '@hooks/use_canvas_overlay_render_loop';
import Canvas from '@lib/canvas';
import {forEachRight, traverseElement, traverseElementChildren} from '@utils';

/* TYPES */

type Box = {
  count: number,
  level: number,
  rect: DOMRect
};

/* HELPERS */

const BACKGROUNDS = ['#220A4F', '#004FD0', '#18B817', '#998F00', '#995400', '#900000', '#D0006F', '#8A2BE2', '#008080', '#FF8C00'];
const FOREGROUNDS = ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'];

const isGenerated = ( style: CSSStyleDeclaration ): boolean => {

  return style.display !== 'none' && style.content !== 'none' && style.content !== 'normal';

};

const getPseudoElementCount = ( element: Element, cache: Map<Element, number> ): number => {

  const cached = cache.get ( element );

  if ( cached !== undefined ) return cached;

  let count = 0;

  if ( isGenerated ( getComputedStyle ( element, '::before' ) ) ) count += 1;
  if ( isGenerated ( getComputedStyle ( element, '::after' ) ) ) count += 1;

  traverseElementChildren ( element, child => {

    count += getPseudoElementCount ( child, cache );

  });

  cache.set ( element, count );

  return count;

};

/* MAIN */

const usePseudoElementCounter = ( ref: $<Element | undefined> = document.body ): void => {

  useCanvasOverlayRenderLoop ( 'pseudo-element-counter', ( canvas, ctx ) => {

    const root = $$(ref);

    if ( !root ) return;

    /* COMPUTING BOXES */

    const boxes: Box[] = [];
    const pseudoElementCountCache = new Map<Element, number> ();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    traverseElement ( root, ( element, level ): boolean => {

      if ( element === canvas ) return false;

      const count = getPseudoElementCount ( element, pseudoElementCountCache );

      if ( !count ) return false;

      const isSkippable = !!boxes.length;
      const rect = element.getBoundingClientRect ();

      if ( !rect.width || !rect.height ) return true;
      if ( isSkippable && ( rect.top > viewportHeight || rect.bottom < 0 ) ) return true;
      if ( isSkippable && ( rect.left > viewportWidth || rect.right < 0 ) ) return true;

      boxes.push ({ count, level, rect });

      return true;

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

      const {count, level, rect} = box;
      const background = BACKGROUNDS[level % BACKGROUNDS.length];
      const foreground = FOREGROUNDS[level % FOREGROUNDS.length];
      const label = `${count}`;

      Canvas.box.paint ( ctx, rect, background, foreground, label );

    });

    /* PAINTING FALLBACK */

    if ( !boxes.length ) {

      Canvas.notice.paint ( ctx, 'no pseudo-elements' );

    }

  });

};

/* EXPORT */

export default usePseudoElementCounter;
