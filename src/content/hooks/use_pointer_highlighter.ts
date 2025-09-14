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

type State = {
  button: number,
  x: number,
  y: number,
  alt: boolean,
  ctrl: boolean,
  meta: boolean,
  shift: boolean
};

/* HELPERS */

const CIRCLE_RADIUS = 22;
const CIRCLE_THICKNESS = 1.5;

const CIRCLE_BUTTON_ARC_LENGTH = 0.35 * Math.PI;
const CIRCLE_BUTTON_ARC_GAP = 0.1 * Math.PI;

const COLOR_BLACK = '#220A4F';
const COLOR_WHITE = '#FFFFFF';

const RENDER_BUTTON = true;
const RENDER_MODIFIERS = true;

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

const event2state = ( event: MouseEvent ): State => {
  const button = event.button;
  const x = event.clientX;
  const y = event.clientY;
  const alt = event.altKey;
  const ctrl = event.ctrlKey;
  const meta = event.metaKey;
  const shift = event.shiftKey;
  return { button, x, y, alt, ctrl, meta, shift };
};

/* MAIN */

//TODO: Support multiple pointers

const usePointerHighlighter = ( ref: $<Element | undefined> = document.body ): void => {

  let state = $<State>();

  /* OBSERVING */

  useEventListener ( window, 'mousedown', ( event: MouseEvent ) => {

    state ( event2state ( event ) );

  });

  useEventListener ( window, 'mousemove', ( event: MouseEvent ) => {

    state ( prev => prev && event2state ( event ) );

  });

  useEventListener ( window, 'mouseup', ( event: MouseEvent ) => {

    state ( undefined );

  });

  useEventListener ( window, 'contextmenu', ( event: MouseEvent ) => {

    setTimeout ( () => {
      state ( undefined );
    }, 50 );

  });

  /* PAINTING */

  const canvas = useCanvasOverlay ( 'pointer-highlighter' );

  useCanvasRenderLoop ( canvas, ctx => {

    useResolved ( state, state => {

      if ( !state ) return;

      const {button, x, y} = state;
      const {alt, ctrl, meta, shift} = state;

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

      if ( RENDER_MODIFIERS ) {

        const modifiers = [
          alt ? 'Alt' : null,
          ctrl ? 'Ctrl' : null,
          meta ? 'Cmd' : null,
          shift ? 'Shift' : null
        ].filter ( Boolean ).join ( '+' );

        if ( modifiers ) {

          ctx.font = '10px sans-serif';

          const measure = ctx.measureText ( modifiers );
          const width = measure.width;
          const height = 10;

          const rectLeft = x - ( width / 2 ) - 1;
          const rectTop = y + CIRCLE_RADIUS + 5;

          ctx.fillStyle = COLOR_BLACK;
          ctx.fillRect ( rectLeft, rectTop, width + 2, height + 4 );

          ctx.fillStyle = COLOR_WHITE;
          ctx.fillText ( modifiers, rectLeft + 1, rectTop + height );

        }

      }

    });

  });

};

/* EXPORT */

export default usePointerHighlighter;
