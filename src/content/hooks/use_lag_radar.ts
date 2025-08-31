
/* IMPORT */

import useCanvasOverlay from '@hooks/use_canvas_overlay';
import useLag from '@hooks/use_lag';
import {sigmoid} from '@utils';

/* HELPERS */

const INTERVAL = 8;
const HEIGHT = 12;
const WIDTH = 256;

/* MAIN */

const useLagRadar = (): void => {

  const size = { width: WIDTH, height: HEIGHT };
  const canvas = useCanvasOverlay ( 'lag-radar', size );
  const ctx = canvas.getContext ( '2d' );

  canvas.style.top = '10px';
  canvas.style.left = '50%';
  canvas.style.transform = 'translateX(-50%)';
  canvas.style.borderRadius = `${HEIGHT}px`;
  canvas.style.backgroundColor = '#000000DD';
  canvas.style.backdropFilter = 'blur(3px)';
  canvas.style.boxShadow = '0 7px 10px 1px rgba(0, 0, 0, .14), 0 2px 16px 2px rgba(0, 0, 0, .12), 0 4px 5px -3px rgba(0, 0, 0, .4)'; // elevation-8

  if ( !ctx ) throw new Error ( 'Failed to get a 2d context for a canvas' );

  let x = 0;

  useLag ( INTERVAL, elapsed => {

    const percentage = sigmoid ( ( Math.min ( 1, elapsed / ( INTERVAL * 10 ) ) - 0.5 ) * 5 );
    const green = Math.round ( 255 * ( 1 - percentage ) ).toString ( 16 ).padStart ( 2, '0' );
    const red = Math.round ( 255 * percentage ).toString ( 16 ).padStart ( 2, '0' );
    const color = `#${red}${green}00`;

    const cursorSize = 4;
    const elapsedSize = Math.round ( elapsed / INTERVAL );
    const elapsedSizeChunk1 = Math.min ( WIDTH - x, elapsedSize );
    const elapsedSizeChunk2 = ( elapsedSize - elapsedSizeChunk1 );

    ctx.fillStyle = color;
    ctx.fillRect ( x, 0, elapsedSizeChunk1, HEIGHT );

    x = ( x + elapsedSizeChunk1 ) % WIDTH;

    ctx.fillStyle = color;
    ctx.fillRect ( x, 0, elapsedSizeChunk2, HEIGHT );

    x = ( x + elapsedSizeChunk2 ) % WIDTH;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect ( x, 0, cursorSize, HEIGHT );

  });

};

/* EXPORT */

export default useLagRadar;
