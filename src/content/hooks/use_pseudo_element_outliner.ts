
/* IMPORT */

import {$$} from 'voby';
import useCanvasOverlayRenderLoop from '@hooks/use_canvas_overlay_render_loop';
import Canvas from '@lib/canvas';
import {forEachRight, getElementRect, getElementStyle, traverseElement} from '@utils';

/* TYPES */

type Box = {
  rect: DOMRect,
  before: boolean,
  after: boolean
};

/* HELPERS */

const BACKGROUND_BEFORE = '#D0006F';
const BACKGROUND_AFTER = '#8A2BE2';
const BACKGROUND_BOTH = '#220A4F';
const FOREGROUND = '#FFFFFF';

const isGenerated = ( style: CSSStyleDeclaration ): boolean => {

  return style.display !== 'none' && style.content !== 'none' && style.content !== 'normal';

};

/* MAIN */

const usePseudoElementOutliner = ( ref: $<Element | undefined> = document.body ): void => {

  useCanvasOverlayRenderLoop ( 'pseudo-element-outliner', ( canvas, ctx ) => {

    const root = $$(ref);

    if ( !root ) return;

    /* COMPUTING BOXES */

    const boxes: Box[] = [];
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    traverseElement ( root, element => {

      if ( element === canvas ) return;

      const before = isGenerated ( getElementStyle ( element, '::before' ) );
      const after = isGenerated ( getElementStyle ( element, '::after' ) );

      if ( !before && !after ) return;

      const isSkippable = !!boxes.length;
      const rect = getElementRect ( element );

      if ( !rect.width || !rect.height ) return;
      if ( isSkippable && ( rect.top > viewportHeight || rect.bottom < 0 ) ) return;
      if ( isSkippable && ( rect.left > viewportWidth || rect.right < 0 ) ) return;

      boxes.push ({ rect, before, after });

    });

    /* PAINTING BOXES */

    forEachRight ( boxes, box => {

      const {rect, before, after} = box;
      const label = before && after ? '::before ::after' : before ? '::before' : '::after';
      const background = before && after ? BACKGROUND_BOTH : before ? BACKGROUND_BEFORE : BACKGROUND_AFTER;

      Canvas.box.paint ( ctx, rect, background, FOREGROUND, label );

    });

    /* PAINTING FALLBACK */

    if ( !boxes.length ) {

      Canvas.notice.paint ( ctx, 'no pseudo-elements' );

    }

  });

};

/* EXPORT */

export default usePseudoElementOutliner;
