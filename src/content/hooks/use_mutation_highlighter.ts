
/* IMPORT */

import {$} from 'voby';
import useAnimationLoop from '@hooks/use_animation_loop';
import useCanvasOverlay from '@hooks/use_canvas_overlay';
import useMutationObserver from '@hooks/use_mutation_observer';
import {isElement, isText} from '@utils';

/* TYPES */

type MutationBox = {
  rect: DOMRect,
  timestamp: number
};

/* HELPERS */

const HIGHLIGHT_TIMEOUT = 750;

/* MAIN */

const useMutationHighlighter = ( ref: $<Element | undefined> = document.body ): void => {

  const canvas = useCanvasOverlay ( 'mutation-highlighter' );
  const ctx = canvas.getContext ( '2d' );

  if ( !ctx ) return;

  let boxes: MutationBox[] = [];

  /* OBSERVING */

  const node2target = ( node: Node ): Element | Text | null => {

    if ( isElement ( node ) ) return node;

    if ( isText ( node ) ) return node;

    return node.parentElement;

  };

  const records2targets = ( records: MutationRecord[] ): (Element | Text)[] => {

    const targetsSet = new Set<Element | Text> ();

    records.forEach ( record => {

      if ( record.type === 'attributes' || record.type === 'characterData' ) {

        const target = node2target ( record.target );

        if ( target ) {

          targetsSet.add ( target );

        }

      }

      if ( record.type === 'childList' ) {

        record.addedNodes.forEach ( node => {

          const target = node2target ( node );

          if ( target ) {

            targetsSet.add ( target );

          }

        });

      }

    });

    return Array.from ( targetsSet );

  };

  const target2rect = ( target: Element | Text ): DOMRect => {

    if ( isElement ( target ) ) {

      return target.getBoundingClientRect ();

    } else {

      const range = document.createRange ();

      range.selectNode ( target );

      const rect = range.getBoundingClientRect ();

      range.detach ();

      return rect;

    }

  };

  const onMutation = ( records: MutationRecord[] ): void => {

    const timestamp = Date.now ();
    const targets = records2targets ( records );

    for ( let i = 0, l = targets.length; i < l; i++ ) {

      const target = targets[i];
      const rect = target2rect ( target );
      const box = { rect, timestamp };

      boxes.push ( box );

    }

  };

  useMutationObserver ( ref, onMutation, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true
  });

  /* PAINTING */

  const clear = (): void => {

    ctx.clearRect ( 0, 0, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER );

  };

  const paint = (): void => {

    const now = Date.now ();

    boxes = boxes.filter ( box => {

      const {rect, timestamp} = box;
      const {left, top, width, height} = rect;

      if ( timestamp + HIGHLIGHT_TIMEOUT <= now ) return false; // No longer needed

      /* PAINTING STROKE */

      const easing = 1 - ( ( now - timestamp ) / HIGHLIGHT_TIMEOUT );

      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(0, 200, 0, ${1 * easing})`;
      ctx.strokeRect ( left, top, width, height );

      /* PAINTING FILL */

      ctx.fillStyle = `rgba(0, 200, 0, ${0.25 * easing})`;
      ctx.fillRect ( left, top, width, height );

      return true; // Still needed

    });

  };

  useAnimationLoop ( () => {

    clear ();
    paint ();

  });

};

/* EXPORT */

export default useMutationHighlighter;
