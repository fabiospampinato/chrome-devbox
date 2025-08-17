
/* IMPORT */

import useToolTrigger from '@hooks/use_tool_trigger';
import RPC from '@lib/rpc_frontend';

/* MAIN */

const PaintHighlighter: ToolConfig = {
  id: 'paint-highlighter',
  name: 'Paint Highlighter',
  description: 'Toggle the paint highlighter, to spot unnecessary painting events happening in the page',
  command: 'devbox.paint-highlighter.toggle',
  shortcut: 'Ctrl+Cmd+P',
  trigger: useToolTrigger ( (): Disposer => {
    RPC.debuggerCall ( 'Overlay.setShowPaintRects', { result: true }, 1 );
    return (): void => {
      RPC.debuggerCall ( 'Overlay.setShowPaintRects', { result: false }, -1 );
    };
  })
};

/* EXPORT */

export default PaintHighlighter;
