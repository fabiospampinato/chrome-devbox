
/* IMPORT */

import useCanvasOverlay from '@hooks/use_canvas_overlay';
import useCanvasRenderLoop from '@hooks/use_canvas_render_loop';

/* MAIN */

const useCanvasOverlayRenderLoop = ( name: string, paint: ( canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D ) => void ): void => {

  const canvas = useCanvasOverlay ( name );

  useCanvasRenderLoop ( canvas, ctx => {

    paint ( canvas, ctx );

  });

};

/* EXPORT */

export default useCanvasOverlayRenderLoop;
