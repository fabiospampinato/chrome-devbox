/* IMPORT */

import {$} from 'voby';
import useCanvasOverlay from '@hooks/use_canvas_overlay';
import useCanvasRenderLoop from '@hooks/use_canvas_render_loop';
import useEventListener from '@hooks/use_event_listener';
import useResolved from '@hooks/use_resolved';

/* TYPES */

type Angles = {
  start: number,
  end: number
};

type Point = {
  button: number,
  x: number,
  y: number
};

/* HELPERS */

const CIRCLE_RADIUS = 22;
const CIRCLE_THICKNESS = 1.5;

const CIRCLE_BUTTON_ARC_LENGTH = 0.35 * Math.PI;
const CIRCLE_BUTTON_ARC_GAP = 0.1 * Math.PI;

const COLOR_BLACK = '#220A4F';
const COLOR_WHITE = '#FFFFFF';

const RENDER_BUTTON = true;

const CIRCLE_BUTTON_ARC_ANGLES: Partial<Record<number, Angles>> = {
  0: { // left
    start: 1.1 * Math.PI,
    end: 1.1 * Math.PI + CIRCLE_BUTTON_ARC_LENGTH,
  },
  1: { // middle
    start: 1.5 * Math.PI - ( CIRCLE_BUTTON_ARC_LENGTH / 2 ),
    end: 1.5 * Math.PI + ( CIRCLE_BUTTON_ARC_LENGTH / 2 ),
  },
  2: { // right
    start: 1.9 * Math.PI - CIRCLE_BUTTON_ARC_LENGTH,
    end: 1.9 * Math.PI,
  },
};

const event2point = ( event: MouseEvent ): Point => {
  const button = event.button;
  const x = event.clientX;
  const y = event.clientY;
  return { button, x, y };
};

/* MAIN */

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

  useEventListener ( window, 'contextmenu', ( event: MouseEvent ) => {

    setTimeout ( () => {
      point ( undefined );
    }, 50 );

  });

  /* PAINTING */

  const canvas = useCanvasOverlay ( 'pointer-highlighter' );

  useCanvasRenderLoop ( canvas, ctx => {

    useResolved ( point, point => {

      if ( !point ) return;

      const {button, x, y} = point;

      if ( RENDER_BUTTON && button >= 0 && button <= 2 ) {

        const buttonAngles = CIRCLE_BUTTON_ARC_ANGLES[button];

        if ( !buttonAngles ) return;

        const paintCircleArcs = ( radius: number, color: string ) => {

          ctx.lineWidth = CIRCLE_THICKNESS;
          ctx.strokeStyle = color;

          /* PAINTING BUTTON SEGMENT */

          const buttonStartAngle = buttonAngles.start;
          const buttonEndAngle = buttonAngles.end;

          ctx.beginPath ();
          ctx.arc ( x, y, radius, buttonStartAngle, buttonEndAngle, false );
          ctx.stroke ();

          /* PAINTING BODY SEGMENT */

          const bodyStartAngle = buttonEndAngle + CIRCLE_BUTTON_ARC_GAP;
          const bodyEndAngle = buttonStartAngle - CIRCLE_BUTTON_ARC_GAP + ( 2 * Math.PI );

          ctx.beginPath ();
          ctx.arc ( x, y, radius, bodyStartAngle, bodyEndAngle, false );
          ctx.stroke ();

        };

        /* PAINTING SEGMENTED CIRCLES */

        paintCircleArcs ( CIRCLE_RADIUS, COLOR_BLACK );
        paintCircleArcs ( CIRCLE_RADIUS - CIRCLE_THICKNESS, COLOR_WHITE );

      } else {

        const paintCircle = ( radius: number, color: string ): void => {

          ctx.lineWidth = CIRCLE_THICKNESS;
          ctx.strokeStyle = color;

          /* PAINTING CIRCLE */

          ctx.beginPath ();
          ctx.arc ( x, y, radius, 0, 2 * Math.PI, false );
          ctx.stroke ();

        };

        /* PAINTING FULL CIRCLES */

        paintCircle ( CIRCLE_RADIUS, COLOR_BLACK );
        paintCircle ( CIRCLE_RADIUS - CIRCLE_THICKNESS, COLOR_WHITE );

      }

    });

  });

};

/* EXPORT */

export default usePointerHighlighter;
