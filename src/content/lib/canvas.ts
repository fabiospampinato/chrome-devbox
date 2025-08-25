
/* MAIN */

const Canvas = {

  box: {

    paint: ( ctx: CanvasRenderingContext2D, rect: DOMRect, background: string, foreground: string, label?: string ): void => {

      Canvas.box.paintStroke ( ctx, rect, background );

      if ( label?.length ) {

        Canvas.box.paintLabel ( ctx, rect, background, foreground, label );

      }

    },

    paintStroke: ( ctx: CanvasRenderingContext2D, rect: DOMRect, background: string ): void => {

      ctx.strokeStyle = background;
      ctx.strokeRect ( rect.left, rect.top, rect.width, rect.height );

    },

    paintLabel: ( ctx: CanvasRenderingContext2D, rect: DOMRect, background: string, foreground: string, label: string ): void => {

      ctx.font = '10px sans-serif';

      const measure = ctx.measureText ( label );
      const width = measure.width;
      const height = 10;

      ctx.fillStyle = background;
      ctx.fillRect ( rect.left, rect.top, width + 2, height + 4 );

      ctx.fillStyle = foreground;
      ctx.fillText ( label, rect.left + 1, rect.top + height );

    }

  }

};

/* EXPORT */

export default Canvas;
