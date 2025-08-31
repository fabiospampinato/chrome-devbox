
/* IMPORT */

import useAnimationLoop from '@hooks/use_animation_loop';

/* MAIN */

const useCanvasRenderLoop = ( canvas: HTMLCanvasElement, paint: ( ctx: CanvasRenderingContext2D ) => void ): void => {

  const ctx = canvas.getContext ( '2d' );

  if ( !ctx ) throw new Error ( 'Failed to get a 2d context for a canvas' );

  const clear = (): void => {

    ctx.clearRect ( 0, 0, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER );

  };

  useAnimationLoop ( () => {

    clear ();
    paint ( ctx );

  });

};

/* EXPORT */

export default useCanvasRenderLoop;
