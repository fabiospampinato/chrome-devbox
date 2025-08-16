
/* IMPORT */

import {$$} from 'voby';
import useDevicePixelRatio from '@hooks/use_device_pixel_ratio';
import useEffect from '@hooks/use_effect';
import useWindowDimensions from '@hooks/use_window_dimensions';

/* MAIN */

const useCanvasOverlay = ( name: string, size?: $<Dimensions> ): HTMLCanvasElement => {

  const canvas = document.createElement ( 'canvas' );
  const context = canvas.getContext ( '2d' );
  const dimensions = size || useWindowDimensions ();
  const ratio = useDevicePixelRatio ();

  canvas.className = `devbox-${name}-overlay`;
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.zIndex = '2147483647';
  canvas.style.pointerEvents = 'none';

  useEffect ( () => {

    const width = $$(dimensions).width;
    const height = $$(dimensions).height;
    const scale = ratio ();

    canvas.width = width * scale;
    canvas.height = height * scale;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    context?.scale ( scale, scale );

  });

  useEffect ( () => {

    document.body.appendChild ( canvas );

    return () => {

      document.body.removeChild ( canvas );

    };

  });

  return canvas;

};

/* EXPORT */

export default useCanvasOverlay;
