
/* IMPORT */

import useTool from '@hooks/use_tool';
import {callDebuggerInWorker} from '@utils';

/* MAIN */

const PaintHighlighter: ToolConfig = {
  id: 'paint-highlighter',
  name: 'Paint Highlighter',
  command: 'devbox.paint-highlighter.toggle',
  shortcut: 'Ctrl+Cmd+P',
  trigger: useTool ( (): Disposer => {
    callDebuggerInWorker ( 'Overlay.setShowPaintRects', { result: true } );
    return (): void => {
      callDebuggerInWorker ( 'Overlay.setShowPaintRects', { result: false } );
    };
  })
};

/* EXPORT */

export default PaintHighlighter;
