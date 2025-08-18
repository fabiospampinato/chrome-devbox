
/* IMPORT */

import useToolTrigger from '@hooks/use_tool_trigger';
import RPC from '@lib/rpc_frontend';
import State from '@lib/state';

/* MAIN */

const PaintHighlighter: ToolConfig<PaintHighlighterState> = {
  id: 'paint-highlighter',
  name: 'Paint Highlighter',
  description: 'Toggle the paint highlighter, to spot unnecessary painting events happening in the page',
  command: 'devbox.paint-highlighter.toggle',
  shortcut: 'Ctrl+Cmd+P',
  state: State.paintHighlighter,
  trigger: useToolTrigger ( (): Disposer => {
    PaintHighlighter.state.active ( true );
    RPC.debuggerCall ( 'Overlay.setShowPaintRects', { result: true }, 1 );
    return (): void => {
      PaintHighlighter.state.active ( false );
      RPC.debuggerCall ( 'Overlay.setShowPaintRects', { result: false }, -1 );
    };
  })
};

/* EXPORT */

export default PaintHighlighter;
