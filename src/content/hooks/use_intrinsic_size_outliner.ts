
/* IMPORT */

import {$$} from 'voby';
import useAnimationLoop from '@hooks/use_animation_loop';
import useCanvasOverlay from '@hooks/use_canvas_overlay';
import {forEachRight, isUndefined, last, traverseElement} from '@utils';

/* TYPES */

type Box = {
  element: Element,
  level: number,
  rect: DOMRect,
  intrinsicHeight: number | undefined,
  intrinsicWidth: number | undefined
};

/* HELPERS */

const BACKGROUND_MATCHING = '#18B817';
const BACKGROUND_NOT_MATCHING = '#D0006F';

const FOREGROUND_MATCHING = '#FFFFFF';
const FOREGROUND_NOT_MATCHING = '#FFFFFF';

const parseIntrinsicDimension = ( value: string ): number | undefined => {

  const numberRaw = last ( value.split ( ' ' ) );

  if ( !numberRaw ) return;

  const number = parseFloat ( numberRaw );

  if ( isNaN ( number ) ) return;

  return number;

};

/* MAIN */

const useIntrinsicSizeOutlienr = ( ref: $<Element | undefined> = document.body ): void => {

  const canvas = useCanvasOverlay ( 'intrinsic-size-outliner' );
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
      const intrinsicHeight = parseIntrinsicDimension ( style.containIntrinsicHeight );
      const intrinsicWidth = parseIntrinsicDimension ( style.containIntrinsicWidth );

      if ( isUndefined ( intrinsicHeight ) && isUndefined ( intrinsicWidth ) ) return;

      boxes.push ({ element, level, rect, intrinsicHeight, intrinsicWidth });

    });

    /* PAINTING BOXES */

    forEachRight ( boxes, box => {

      const {rect} = box;
      const intrinsicHeight = box.intrinsicHeight ?? rect.height;
      const intrinsicWidth = box.intrinsicWidth ?? rect.width;
      const isMatching = intrinsicHeight === rect.height && intrinsicWidth === rect.width;
      const background = isMatching ? BACKGROUND_MATCHING : BACKGROUND_NOT_MATCHING;
      const foreground = isMatching ? FOREGROUND_MATCHING : FOREGROUND_NOT_MATCHING;
      const label = isMatching ? `${rect.width}x${rect.height}` : `${intrinsicWidth}x${intrinsicHeight} → ${rect.width}x${rect.height}`;

      /* PAINTING INTRINSIC STROKE */

      ctx.strokeStyle = background;
      ctx.setLineDash ([ 4, 4 ]);
      ctx.strokeRect ( rect.left, rect.top, intrinsicWidth ?? rect.width, intrinsicHeight ?? rect.height );

      /* PAINTING MEASURED STROKE */

      ctx.strokeStyle = background;
      ctx.setLineDash ([]);
      ctx.strokeRect ( rect.left, rect.top, rect.width, rect.height );

      /* PAINTING LABEL */

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

export default useIntrinsicSizeOutlienr;
