
/* IMPORT */

import {$} from 'voby';
import PathProp from 'path-prop';
import useCanvasOverlay from '@hooks/use_canvas_overlay';
import useEffect from '@hooks/use_effect';
import useEventListener from '@hooks/use_event_listener';
import useFallbacked from '@hooks/use_fallbacked';
import useLocalStorage from '@hooks/use_local_storage';
import useResolved from '@hooks/use_resolved';
import useWindowRect from '@hooks/use_window_rect';
import {cloneDeepJSON, isEqual} from '@utils';

/* TYPES */

type Line = {
  offset: number
  horizontal: boolean
};

type Pill = {
  line?: Line,
  x: number,
  y: number
};

/* HELPERS */

const BACKGROUND_COLOR = 'transparent';
const COLOR_RULER = '#606060BB';
const COLOR_MARK_SMALL = '#FFFFFF';
const COLOR_MARK_MEDIUM = '#FFFFFF';
const COLOR_MARK_BIG = '#FFFFFF';
const COLOR_LABEL = '#FFFFFF';
const COLOR_LINE = '#2D72D2';
const COLOR_GRID_SMALL = 'transparent';
const COLOR_GRID_MEDIUM = '#80808022';
const COLOR_GRID_BIG = '#80808033';
const COLOR_PILL = '#101010BB';
const COLOR_PILL_LABEL = '#FFFFFF';
const GRID_TICKNESS = 1;
const LINE_TICKNESS = 1;
const RULER_TICKNESS = 22;
const MARK_TICKNESS = 1;
const MARK_SIZE_SMALL = 4;
const MARK_SIZE_MEDIUM = 8;
const MARK_SIZE_BIG = 12;
const MARK_GAP_SMALL = 5;
const MARK_GAP_MEDIUM = 20;
const MARK_GAP_BIG = 100;
const LABEL_SIZE = 10;
const LABEL_OFFSET = 19;
const PILL_LABEL_SIZE = 12;
const PILL_OFFSET = 6;
const PILL_PADDING_X = 12;
const PILL_PADDING_Y = 8;
const PILL_RADIUS = 12;
const FONT_FAMILY = 'sans-serif';
const CLOSEST_RADIUS = 5;

/* MAIN */

const useRulers = (): void => {

  const canvas = useCanvasOverlay ( 'rulers' );
  const ctx = canvas.getContext ( '2d' );
  const grid = useFallbacked ( useLocalStorage<boolean> ( 'devbox.rulers.grid' ), false );
  const lines = useFallbacked ( useLocalStorage<Line[]> ( 'devbox.rulers.lines' ), [] );

  const pill = $<Pill>();
  const rect = useWindowRect ();

  if ( !ctx ) return;

  const clear = (): void => {

    ctx.clearRect ( 0, 0, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER );

  };

  const getClosestLine = ( x: number, y: number, radius: number = Infinity ): Line | undefined => {

    const getDistance = ( line: Line ) => line.horizontal ? Math.abs ( line.offset - y ) : Math.abs ( line.offset - x );
    const line = [...lines ()].sort ( ( a, b ) => getDistance ( a ) - getDistance ( b ) )[0];

    if ( !line ) return;

    const distance = getDistance ( line );

    if ( distance > radius ) return;

    return line;

  };

  const paintBackground = ( x: number, y: number, width: number, height: number ): void => {

    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect ( RULER_TICKNESS, RULER_TICKNESS, width, height );

  };

  const paintLines = ( x: number, y: number, width: number, height: number ): void => {

    for ( const line of lines () ) {

      if ( line.offset <= RULER_TICKNESS ) continue;

      ctx.fillStyle = COLOR_LINE;

      if ( line.horizontal ) {

        ctx.fillRect ( x + RULER_TICKNESS, y + line.offset - LINE_TICKNESS, width - RULER_TICKNESS, LINE_TICKNESS );

      } else {

        ctx.fillRect ( x + line.offset - LINE_TICKNESS, y + RULER_TICKNESS, LINE_TICKNESS, height - RULER_TICKNESS );

      }

    }

  };

  const paintPill = ( x: number, y: number, width: number, height: number ): void => {

    useResolved ( pill, pill => {

      if ( !pill?.line ) return;

      ctx.font = `${PILL_LABEL_SIZE}px ${FONT_FAMILY}`;

      const label = `${pill.line.offset}px`;
      const measure = ctx.measureText ( label );

      /* BACKGROUND */

      const height = PILL_PADDING_Y + LABEL_SIZE + PILL_PADDING_Y;
      const width = PILL_PADDING_X + measure.width + PILL_PADDING_X;
      const x = pill.x + PILL_OFFSET;
      const y = pill.y - height - PILL_OFFSET;

      ctx.fillStyle = COLOR_PILL;

      ctx.roundRect ( x, y, width, height, PILL_RADIUS );
      ctx.fill ();

      /* LABEL */

      const tx = x + PILL_PADDING_X;
      const ty = y + PILL_PADDING_Y + PILL_LABEL_SIZE -3; //UGLY

      ctx.fillStyle = COLOR_PILL_LABEL;

      ctx.fillText ( label, tx, ty );

    });

  };

  const paintCornerRuler = ( x: number, y: number, width: number, height: number ): void => {

    ctx.fillStyle = COLOR_RULER;

    ctx.translate ( RULER_TICKNESS, RULER_TICKNESS );
    ctx.moveTo ( 0, 0 );
    ctx.lineTo ( 5, 0 );
    ctx.lineTo ( 5, 0 );
    ctx.bezierCurveTo ( 2.75, 0, 0, 2.75, 0, 5 );
    ctx.lineTo ( 0, 5 );
    ctx.lineTo ( 0, 0 );
    ctx.translate ( -RULER_TICKNESS, -RULER_TICKNESS );
    ctx.fill ();

  };

  const paintHorizontalRuler = ( x: number, y: number, width: number, height: number ): void => {

    ctx.fillStyle = COLOR_RULER;
    ctx.fillRect ( x + RULER_TICKNESS, y, width - RULER_TICKNESS, RULER_TICKNESS );

  };

  const paintHorizontalMarks = ( x: number, y: number, width: number, height: number ): void => {

    for ( let i = MARK_GAP_SMALL; i <= width; i += MARK_GAP_SMALL ) {
      if ( i % MARK_GAP_BIG === 0 ) {
        ctx.fillStyle = COLOR_MARK_BIG;
        ctx.fillRect ( x + i - MARK_TICKNESS, y, MARK_TICKNESS, MARK_SIZE_BIG );
      } else if ( i % MARK_GAP_MEDIUM === 0 ) {
        ctx.fillStyle = COLOR_MARK_MEDIUM;
        ctx.fillRect ( x + i - MARK_TICKNESS, y, MARK_TICKNESS, MARK_SIZE_MEDIUM );
      } else {
        ctx.fillStyle = COLOR_MARK_SMALL;
        ctx.fillRect ( x + i - MARK_TICKNESS, y, MARK_TICKNESS, MARK_SIZE_SMALL );
      }
    }

  };

  const paintHorizontalLabels = ( x: number, y: number, width: number, height: number ): void => {

    ctx.fillStyle = COLOR_LABEL;
    ctx.font = `${LABEL_SIZE}px ${FONT_FAMILY}`;

    for ( let i = MARK_GAP_BIG; i < width + MARK_GAP_BIG; i += MARK_GAP_BIG ) {
      const label = `${i}`;
      const measure = ctx.measureText ( label );
      ctx.fillText ( label, x + i - measure.width / 2, y + LABEL_OFFSET );
    }

  };

  const paintHorizontalGridSmall = ( x: number, y: number, width: number, height: number ): void => {

    for ( let i = MARK_GAP_SMALL; i <= width; i += MARK_GAP_SMALL ) {
      if ( i <= RULER_TICKNESS ) continue;
      ctx.fillStyle = COLOR_GRID_SMALL;
      ctx.fillRect ( x + i - GRID_TICKNESS, y + RULER_TICKNESS, GRID_TICKNESS, height - RULER_TICKNESS );
    }

  };

  const paintHorizontalGridMedium = ( x: number, y: number, width: number, height: number ): void => {

    for ( let i = MARK_GAP_MEDIUM; i <= width; i += MARK_GAP_MEDIUM ) {
      if ( i <= RULER_TICKNESS ) continue;
      ctx.fillStyle = COLOR_GRID_MEDIUM;
      ctx.fillRect ( x + i - GRID_TICKNESS, y + RULER_TICKNESS, GRID_TICKNESS, height - RULER_TICKNESS );
    }

  };

  const paintHorizontalGridBig = ( x: number, y: number, width: number, height: number ): void => {

    for ( let i = MARK_GAP_BIG; i <= width; i += MARK_GAP_BIG ) {
      if ( i <= RULER_TICKNESS ) continue;
      ctx.fillStyle = COLOR_GRID_BIG;
      ctx.fillRect ( x + i - GRID_TICKNESS, y + RULER_TICKNESS, GRID_TICKNESS, height - RULER_TICKNESS );
    }

  };

  const paintVerticalRuler = ( x: number, y: number, width: number, height: number ): void => {

    ctx.fillStyle = COLOR_RULER;
    ctx.fillRect ( x, y, RULER_TICKNESS, height );

  };

  const paintVerticalMarks = ( x: number, y: number, width: number, height: number ): void => {

    for ( let i = MARK_GAP_SMALL; i < height; i += MARK_GAP_SMALL ) {
      if ( i % MARK_GAP_BIG === 0 ) {
        ctx.fillStyle = COLOR_MARK_BIG;
        ctx.fillRect ( x, y + i - MARK_TICKNESS, MARK_SIZE_BIG, MARK_TICKNESS );
      } else if ( i % MARK_GAP_MEDIUM === 0 ) {
        ctx.fillStyle = COLOR_MARK_MEDIUM;
        ctx.fillRect ( x, y + i - MARK_TICKNESS, MARK_SIZE_MEDIUM, MARK_TICKNESS );
      } else {
        ctx.fillStyle = COLOR_MARK_SMALL;
        ctx.fillRect ( x, y + i - MARK_TICKNESS, MARK_SIZE_SMALL, MARK_TICKNESS );
      }
    }

  };

  const paintVerticalLabels = ( x: number, y: number, width: number, height: number ): void => {

    ctx.rotate ( ( Math.PI / 180 ) * -90 );

    ctx.fillStyle = COLOR_LABEL;
    ctx.font = `${LABEL_SIZE}px ${FONT_FAMILY}`;

    for ( let i = MARK_GAP_BIG; i < height + MARK_GAP_BIG; i += MARK_GAP_BIG ) {
      const label = `${i}`;
      const measure = ctx.measureText ( label );
      ctx.fillText ( label, - y - i - measure.width / 2, x + LABEL_OFFSET );
    }

    ctx.rotate ( ( Math.PI / 180 ) * 90 );

  };

  const paintVerticalGridSmall = ( x: number, y: number, width: number, height: number ): void => {

    for ( let i = MARK_GAP_SMALL; i < height; i += MARK_GAP_SMALL ) {
      if ( i <= RULER_TICKNESS ) continue;
      ctx.fillStyle = COLOR_GRID_SMALL;
      ctx.fillRect ( x + RULER_TICKNESS, y + i - GRID_TICKNESS, width - RULER_TICKNESS, GRID_TICKNESS );
    }

  };

  const paintVerticalGridMedium = ( x: number, y: number, width: number, height: number ): void => {

    for ( let i = MARK_GAP_MEDIUM; i < height; i += MARK_GAP_MEDIUM ) {
      if ( i <= RULER_TICKNESS ) continue;
      ctx.fillStyle = COLOR_GRID_MEDIUM;
      ctx.fillRect ( x + RULER_TICKNESS, y + i - GRID_TICKNESS, width - RULER_TICKNESS, GRID_TICKNESS );
    }

  };

  const paintVerticalGridBig = ( x: number, y: number, width: number, height: number ): void => {

    for ( let i = MARK_GAP_BIG; i < height; i += MARK_GAP_BIG ) {
      if ( i <= RULER_TICKNESS ) continue;
      ctx.fillStyle = COLOR_GRID_BIG;
      ctx.fillRect ( x + RULER_TICKNESS, y + i - GRID_TICKNESS, width - RULER_TICKNESS, GRID_TICKNESS );
    }

  };

  const paint = ( x: number, y: number, width: number, height: number ): void => {

    ctx.beginPath ();

    paintBackground ( x, y, width, height );

    paintHorizontalRuler ( x, y, width, height );
    paintVerticalRuler ( x, y, width, height );
    paintCornerRuler ( x, y, width, height );

    paintHorizontalMarks ( x, y, width, height );
    paintVerticalMarks ( x, y, width, height );

    paintHorizontalLabels ( x, y, width, height );
    paintVerticalLabels ( x, y, width, height );

    if ( grid () ) {

      paintHorizontalGridSmall ( x, y, width, height );
      paintVerticalGridSmall ( x, y, width, height );

      paintHorizontalGridMedium ( x, y, width, height );
      paintVerticalGridMedium ( x, y, width, height );

      paintHorizontalGridBig ( x, y, width, height );
      paintVerticalGridBig ( x, y, width, height );

    }

    paintLines ( x, y, width, height );
    paintPill ( x, y, width, height );

    ctx.closePath ();

  };

  useEffect ( () => {

    useResolved ( rect, rect => {

      clear ();
      paint ( rect.x, rect.y, rect.width, rect.height );

    });

  });

  useEventListener ( window, 'click', event => { // Toggling the grid on corner click, and resetting lines on alt click

    const {altKey, clientX, clientY} = event;

    useResolved ( rect, rect => {

      if ( clientX < rect.x || clientX > rect.x + RULER_TICKNESS ) return;

      if ( clientY < rect.y || clientY > rect.y + RULER_TICKNESS ) return;

      if ( altKey ) {

        lines ( [] );

      } else {

        grid ( prev => !prev );

      }

    });

  });

  useEventListener ( window, 'mousedown', ({ clientX, clientY }) => { // Creating a new line

    useResolved ( rect, rect => {

      const isHorizontalX = ( clientX >= rect.x + RULER_TICKNESS ) && ( clientX <= rect.x + RULER_TICKNESS + rect.width );
      const isHorizontalY = ( clientY >= rect.y ) && ( clientY <= rect.y + RULER_TICKNESS );
      const isHorizontal = isHorizontalX && isHorizontalY;

      const isVerticalX = ( clientX >= rect.x ) && ( clientX <= rect.x + RULER_TICKNESS );
      const isVerticalY = ( clientY >= rect.y + RULER_TICKNESS ) && ( clientY <= rect.y + RULER_TICKNESS + rect.height );
      const isVertical = isVerticalX && isVerticalY;

      const isNew = isVertical || isHorizontal;

      const offset = isHorizontal ? clientY - rect.y : clientX - rect.x;
      const horizontal = isHorizontal;

      const line = isNew ? { offset, horizontal } : getClosestLine ( clientX, clientY, CLOSEST_RADIUS );

      if ( !line ) return;

      const lineIndex = isNew ? lines ().length : lines ().indexOf ( line );

      if ( lineIndex < 0 ) return;

      if ( isNew ) {

        lines ( prev => [...prev, line] );

      }

      const disposeMouseMove = useEventListener ( window, 'mousemove', ({ clientX, clientY }) => { // Moving the line

        const offsetNext = line.horizontal ? clientY - rect.y : clientX - rect.x;

        lines ( prev => PathProp.set ( cloneDeepJSON ( prev ), `${lineIndex}.offset`, offsetNext ) ); //UGLY

        const lineNext = lines ()[lineIndex];

        pill ({ line: lineNext, x: clientX, y: clientY });

      });

      const disposeMouseUp = useEventListener ( window, 'mouseup', () => { // Stopping listening

        pill ( undefined );

        disposeMouseMove ();
        disposeMouseUp ();

      });

    });

  });

  useEventListener ( window, 'click', ({ altKey, clientX, clientY }) => { // Deleting a line on alt click

    if ( !altKey ) return;

    const line = getClosestLine ( clientX, clientY, CLOSEST_RADIUS );

    if ( !line ) return;

    lines ( prev => prev.filter ( other => !isEqual ( other, line ) ) );

  });

};

/* EXPORT */

export default useRulers;
