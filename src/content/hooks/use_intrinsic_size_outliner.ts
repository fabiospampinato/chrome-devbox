
/* IMPORT */

import {$$} from 'voby';
import useAnimationLoop from '@hooks/use_animation_loop';
import useCanvasOverlay from '@hooks/use_canvas_overlay';
import Canvas from '@lib/canvas';
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
      const intrinsicRect = new DOMRect ( rect.left, rect.top, intrinsicWidth, intrinsicHeight );
      const isMatching = intrinsicHeight === rect.height && intrinsicWidth === rect.width;
      const background = isMatching ? BACKGROUND_MATCHING : BACKGROUND_NOT_MATCHING;
      const foreground = isMatching ? FOREGROUND_MATCHING : FOREGROUND_NOT_MATCHING;
      const label = isMatching ? `${rect.width}x${rect.height}` : `${intrinsicWidth}x${intrinsicHeight} → ${rect.width}x${rect.height}`;

      /* PAINTING INTRINSIC STROKE */

      ctx.setLineDash ([ 4, 4 ]);
      Canvas.box.paintStroke ( ctx, intrinsicRect, background );

      /* PAINTING MEASURED STROKE */

      ctx.setLineDash ([]);
      Canvas.box.paintStroke ( ctx, rect, background );

      /* PAINTING LABEL */

      Canvas.box.paintLabel ( ctx, rect, background, foreground, label );

    });

    /* PAINTING FALLBACK */

    if ( !boxes.length ) {

      Canvas.notice.paint ( ctx, 'no intrinsic sizes' );

    }

  };

  useAnimationLoop ( () => {

    clear ();
    paint ();

  });

};

/* EXPORT */

export default useIntrinsicSizeOutlienr;
