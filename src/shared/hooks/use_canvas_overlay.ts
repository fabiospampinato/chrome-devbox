
/* IMPORT */

import useDevicePixelRatio from './use_device_pixel_ratio';
import useWindowDimensions from './use_window_dimensions';
import useEffect from './use_effect';

/* MAIN */

const useCanvasOverlay = (): HTMLCanvasElement => {

  const canvas = document.createElement ( 'canvas' );
  const context = canvas.getContext ( '2d' );
  const dimensions = useWindowDimensions ();
  const ratio = useDevicePixelRatio ();

  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.zIndex = '9999999999';
  canvas.style.pointerEvents = 'none';

  useEffect ( () => {

    const width = dimensions ().width;
    const height = dimensions ().height;
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
