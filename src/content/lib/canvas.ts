
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

  },

  flashingBox: {

    paint: ( ctx: CanvasRenderingContext2D, rect: DOMRect, easing: number ): void => {

      Canvas.flashingBox.paintFill ( ctx, rect, easing );
      Canvas.flashingBox.paintStroke ( ctx, rect, easing );

    },

    paintFill: ( ctx: CanvasRenderingContext2D, rect: DOMRect, easing: number ): void => {

      ctx.fillStyle = `rgba(0, 200, 0, ${0.25 * easing})`;
      ctx.fillRect ( rect.left, rect.top, rect.width, rect.height, );

    },

    paintStroke: ( ctx: CanvasRenderingContext2D, rect: DOMRect, easing: number ): void => {

      ctx.strokeStyle = `rgba(0, 200, 0, ${1 * easing})`;
      ctx.strokeRect ( rect.left, rect.top, rect.width, rect.height );

    }

  },

  notice: {

    paint: ( ctx: CanvasRenderingContext2D, message: string ): void => {

      const x = 1;
      const y = 1;
      const width = window.innerWidth - ( x * 2 );
      const height = window.innerHeight - ( y * 2 );
      const rect = new DOMRect ( x, y, width, height );
      const label = ` ${message.trim ()} `;

      Canvas.box.paintLabel ( ctx, rect, '#900000', '#FFFFFF', label );

    }

  }

};

/* EXPORT */

export default Canvas;
