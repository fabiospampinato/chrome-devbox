
/* IMPORT */

import {$$} from 'voby';
import useCanvasOverlayRenderLoop from '@hooks/use_canvas_overlay_render_loop';
import Canvas from '@lib/canvas';
import {forEachRight, traverseElement} from '@utils';

/* TYPES */

type Box = {
  element: Element,
  level: number,
  rect: DOMRect,
  display: string
};

/* HELPERS */

const BACKGROUND = '#220A4F';
const FOREGROUND = '#FFFFFF';

const BACKGROUNDS_BY_VALUE: Partial<Record<string, string>> = {
  'block': '#FF8C00',
  'contents': '#008080',
  'flex': '#18B817',
  'flow': '#D0006F',
  'grid': '#8A2BE2',
  'inline': '#998F00',
  'inline-block': '#FFB347',
  'inline-flex': '#7CE37B',
  'inline-grid': '#B388FF',
  'inline-table': '#6695E0',
  'ruby': '#995400',
  'table': '#004FD0',
  'table-caption': '#3372D8',
  'table-cell': '#A8C5F0',
  'table-column': '#85B0ED',
  'table-column-group': '#406BAA',
  'table-footer-group': '#003B9E',
  'table-header-group': '#003B9E',
  'table-row': '#6695E0',
  'table-row-group': '#3372D8',
};

/* MAIN */

const useDisplayOutliner = ( ref: $<Element | undefined> = document.body, filter: ( element: Element ) => boolean = () => true ): void => {

  useCanvasOverlayRenderLoop ( 'display-outliner', ( canvas, ctx ) => {

    const root = $$(ref);

    if ( !root ) return;

    /* COMPUTING BOXES */

    const boxes: Box[] = [];
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    traverseElement ( root, ( element, level ) => {

      if ( element === canvas ) return;

      const isSkippable = !!boxes.length;
      const rect = element.getBoundingClientRect ();

      if ( !rect.width || !rect.height ) return;
      if ( isSkippable && ( rect.top > viewportHeight || rect.bottom < 0 ) ) return;
      if ( isSkippable && ( rect.left > viewportWidth || rect.right < 0 ) ) return;

      const style = getComputedStyle ( element );
      const display = style.display;

      boxes.push ({ element, level, rect, display });

    });

    /* PAINTING BOXES */

    forEachRight ( boxes, box => {

      const {rect, display} = box;
      const label = display;
      const background = BACKGROUNDS_BY_VALUE[display] ?? BACKGROUND;
      const foreground = FOREGROUND;

      Canvas.box.paint ( ctx, rect, background, foreground, label );

    });

    /* PAINTING FALLBACK */

    if ( !boxes.length ) {

      Canvas.notice.paint ( ctx, 'no displays' );

    }

  });

};

/* EXPORT */

export default useDisplayOutliner;
