
/* IMPORT */

import {$} from 'voby';
import useCanvasOverlay from '@hooks/use_canvas_overlay';
import useCanvasRenderLoop from '@hooks/use_canvas_render_loop';
import useEventListener from '@hooks/use_event_listener';
import useResolved from '@hooks/use_resolved';

/* TYPES */

type Point = {
  x: number,
  y: number
};

/* HELPERS */

const CIRCLE_RADIUS = 22;
const CIRCLE_THICKNESS = 1.5;
const COLOR_BLACK = '#220A4F';
const COLOR_WHITE = '#FFFFFF';

const event2point = ( event: MouseEvent ): Point => {
  const x = event.clientX;
  const y = event.clientY;
  return { x, y };
};

/* MAIN */

//TODO: Make which button was pressed visible
//TODO: Make modifier keys visible (Shift, Ctrl, Alt, Meta)
//TODO: Support multiple pointers

const usePointerHighlighter = ( ref: $<Element | undefined> = document.body ): void => {

  let point = $<Point>();

  /* OBSERVING */

  useEventListener ( window, 'mousedown', ( event: MouseEvent ) => {

    point ( event2point ( event ) );

  });

  useEventListener ( window, 'mousemove', ( event: MouseEvent ) => {

    point ( prev => prev && event2point ( event ) );


  });

  useEventListener ( window, 'mouseup', ( event: MouseEvent ) => {

    point ( undefined );

  });

  /* PAINTING */

  const canvas = useCanvasOverlay ( 'pointer-highlighter' );

  useCanvasRenderLoop ( canvas, ctx => {

    useResolved ( point, point => {

      if ( !point ) return;

      const {x, y} = point;

      /* PAINTING BLACK CIRCLE */

      ctx.beginPath ();
      ctx.arc ( x, y, CIRCLE_RADIUS, 0, 2 * Math.PI, false );
      ctx.lineWidth = CIRCLE_THICKNESS;
      ctx.strokeStyle = COLOR_BLACK;
      ctx.stroke ();

      /* PAINTING WHITE CIRCLE */

      ctx.beginPath ();
      ctx.arc ( x, y, CIRCLE_RADIUS - CIRCLE_THICKNESS, 0, 2 * Math.PI, false );
      ctx.lineWidth = CIRCLE_THICKNESS;
      ctx.strokeStyle = COLOR_WHITE;
      ctx.stroke ();

    });

  });

};

/* EXPORT */

export default usePointerHighlighter;
