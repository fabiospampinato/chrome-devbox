
/* IMPORT */

import {$$} from 'voby';
import useAnimationLoop from '@hooks/use_animation_loop';
import useCanvasOverlay from '@hooks/use_canvas_overlay';
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

const useContainOutliner = ( ref: $<Element | undefined> = document.body, filter: ( element: Element ) => boolean = () => true ): void => {

  const canvas = useCanvasOverlay ( 'contain-outliner' );
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
      const contain = style.getPropertyValue ( 'contain' );

      const isContent = contain === 'content';
      const isStrict = contain === 'strict';

      const isLayout = isStrict || isContent || /\blayout\b/i.test ( contain );
      const isPaint = isStrict || isContent || /\bpaint\b/i.test ( contain );
      const isSize = isStrict || /\bsize\b/i.test ( contain );
      const isInlineSIze = isStrict || /\binline-size\b/i.test ( contain );
      const isStyle = isStrict || /\bsize\b/i.test ( contain );

      if ( !isLayout && !isPaint && !isSize && !isInlineSIze && !isStyle ) return;

      const containment = { isLayout, isPaint, isSize, isInlineSIze, isStyle };

      boxes.push ({ element, level, rect, containment });

    });

    /* PAINTING BOXES */

    forEachRight ( boxes, box => {

      const {rect, containment} = box;
      const {isLayout, isPaint, isSize, isInlineSIze, isStyle} = containment;
      const labelShort = `${isLayout ? 'L' : ''}${isPaint ? 'P' : ''}${isSize ? 'S' : isInlineSIze ? 'I' : ''}${isStyle ? 'Y' : ''}`;
      // const labelLong = [isLayout ? 'layout' : '', isPaint ? 'paint' : '', isSize ? 'size' : isInlineSIze ? 'isize' : '', isStyle ? 'style' : ''].filter ( Boolean ).join ( '/' );
      const background = BACKGROUND_COLORS_BY_LENGTH[labelShort.length];
      const foreground = FOREGROUND_COLORS_BY_LENGTH[labelShort.length];

      /* PAINTING STROKE */

      ctx.strokeStyle = background;
      ctx.strokeRect ( rect.left, rect.top, rect.width, rect.height );

      /* PAINTING LABEL */

      ctx.font = '10px sans-serif';

      const measure = ctx.measureText ( labelShort );
      const width = measure.width;
      const height = 10;

      ctx.fillStyle = background;
      ctx.fillRect ( rect.left, rect.top, width + 2, height + 4 );

      ctx.fillStyle = foreground;
      ctx.fillText ( labelShort, rect.left + 1, rect.top + height );

    });

  };

  useAnimationLoop ( () => {

    clear ();
    paint ();

  });

};

/* EXPORT */

export default useContainOutliner;
