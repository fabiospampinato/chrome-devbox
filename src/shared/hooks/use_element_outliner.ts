
/* IMPORT */

import {$$} from 'voby';
import {findChildElement, isTruthy} from '../utils';
import useAnimationLoop from './use_animation_loop';
import useCanvasOverlay from './use_canvas_overlay';

/* HELPERS */

const BACKGROUNDS = ['#220A4F', '#004FD0', '#18B817', '#998F00', '#995400', '#900000'];
const FOREGROUNDS = ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'];

/* MAIN */

//TODO: Take care of z-index layers, if that's possible somehow

const useElementOutliner = ( ref: $<Element | undefined> = document.documentElement ): void => {

  const canvas = useCanvasOverlay ();
  const ctx = canvas.getContext ( '2d' );

  if ( !ctx ) return;

  const clear = (): void => {

    ctx.clearRect ( 0, 0, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER );

  };

  const paint = (): void => {

    const target = $$(ref);

    if ( !target ) return;

    const viewbox = target.getBoundingClientRect ();

    if ( !viewbox.width || !viewbox.height ) return;

    const elements = Array.from ( target.querySelectorAll ( '*' ) );
    const leaves = elements.filter ( element => !element.childElementCount );
    const traversed = new Set ();

    const paint = ( elements: Element[], level: number ): void => {

      if ( !elements.length ) return;

      const background = BACKGROUNDS[level % BACKGROUNDS.length];
      const foreground = FOREGROUNDS[level % FOREGROUNDS.length];

      for ( let i = 0, l = elements.length; i < l; i++ ) {

        const element = elements[i];

        if ( traversed.has ( element ) ) continue;

        if ( findChildElement ( element, child => !traversed.has ( child ) ) ) continue;

        traversed.add ( element );

        const rect = element.getBoundingClientRect ();

        if ( !rect.width || !rect.height ) continue;
        if ( rect.top > viewbox.bottom || rect.bottom < viewbox.top ) continue;
        if ( rect.left > viewbox.right || rect.right < viewbox.left ) continue;

        ctx.strokeStyle = background;
        ctx.strokeRect ( rect.left, rect.top, rect.width, rect.height );

        const nr = element.querySelectorAll ( '*' ).length;
        const label = `${nr}`;

        if ( nr < 1 ) continue;

        ctx.font = '10px sans-serif';

        const measure = ctx.measureText ( label );
        const width = measure.width;
        const height = 10;

        ctx.fillStyle = background;
        ctx.fillRect ( rect.left, rect.top, width + 2, height + 4 );

        ctx.fillStyle = foreground;
        ctx.fillText ( label, rect.left + 1, rect.top + height );

      }

      const parents = elements.map ( leaf => leaf.parentElement ).filter ( isTruthy ).filter ( parent => target.contains ( parent ) );

      if ( !parents.length ) return;

      paint ( parents, level + 1 );

    };

    paint ( leaves, 0 );

  };

  useAnimationLoop ( () => {

    clear ();
    paint ();

  });

};

/* EXPORT */

export default useElementOutliner;
