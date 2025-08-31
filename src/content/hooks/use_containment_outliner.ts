
/* IMPORT */

import {$$} from 'voby';
import useCanvasOverlayRenderLoop from '@hooks/use_canvas_overlay_render_loop';
import Canvas from '@lib/canvas';
import {forEachRight, traverseElement} from '@utils';

/* TYPES */

type Containment = {
  isInlineSIze: boolean,
  isLayout: boolean,
  isPaint: boolean,
  isSize: boolean,
  isStyle: boolean,
};

type Box = {
  element: Element,
  level: number,
  rect: DOMRect,
  containment: Containment
};

/* HELPERS */

const BACKGROUND_COLORS_BY_LENGTH = [ // L -> LPSY
  '#000000',
  '#900000',
  '#995400',
  '#998F00',
  '#18B817'
];

const FOREGROUND_COLORS_BY_LENGTH = [ // L -> LPSY
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF'
];

/* MAIN */

const useContainmentOutliner = ( ref: $<Element | undefined> = document.body, filter: ( element: Element ) => boolean = () => true ): void => {

  useCanvasOverlayRenderLoop ( 'containment-outliner', ( canvas, ctx ) => {

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

      const style = getComputedStyle ( element );

      const contain = style.contain;
      const contentVisibility = style.contentVisibility

      const overflowX = style.overflowX;
      const overflowY = style.overflowY;
      const isOverflowXContained = overflowX === 'auto' || overflowX === 'scroll' || overflowX === 'hidden' || overflowX === 'clip';
      const isOverflowYContained = overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'hidden' || overflowY === 'clip';
      const isOverflowContained = isOverflowXContained && isOverflowYContained;

      const isContent = contain === 'content' || contentVisibility === 'auto' || contentVisibility === 'hidden';
      const isStrict = contain === 'strict';

      const isLayout = isStrict || isContent || isOverflowContained || /\blayout\b/i.test ( contain );
      const isPaint = isStrict || isContent || isOverflowContained || /\bpaint\b/i.test ( contain );
      const isSize = isStrict || /\bsize\b/i.test ( contain );
      const isInlineSIze = isStrict || /\binline-size\b/i.test ( contain );
      const isStyle = isStrict || isContent || /\bsize\b/i.test ( contain );

      if ( !isLayout && !isPaint && !isSize && !isInlineSIze && !isStyle ) return;

      const containment = { isLayout, isPaint, isSize, isInlineSIze, isStyle };

      boxes.push ({ element, level, rect, containment });

    });

    /* PAINTING BOXES */

    forEachRight ( boxes, box => {

      const {rect, containment} = box;
      const {isLayout, isPaint, isSize, isInlineSIze, isStyle} = containment;
      const labelShort = `${isLayout ? 'L' : ''}${isPaint ? 'P' : ''}${isSize ? 'S' : isInlineSIze ? 'I' : ''}${isStyle ? 'Y' : ''}`;
      const labelLong = [isLayout ? 'layout' : '', isPaint ? 'paint' : '', isSize ? 'size' : isInlineSIze ? 'isize' : '', isStyle ? 'style' : ''].filter ( Boolean ).join ( ' ' );
      const background = BACKGROUND_COLORS_BY_LENGTH[labelShort.length];
      const foreground = FOREGROUND_COLORS_BY_LENGTH[labelShort.length];

      Canvas.box.paint ( ctx, rect, background, foreground, labelLong );

    });

    /* PAINTING FALLBACK */

    if ( !boxes.length ) {

      Canvas.notice.paint ( ctx, 'no containment' );

    }

  });

};

/* EXPORT */

export default useContainmentOutliner;
