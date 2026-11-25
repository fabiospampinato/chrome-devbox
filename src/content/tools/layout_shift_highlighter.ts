
/* IMPORT */

import useToolTrigger from '@hooks/use_tool_trigger';
import {IS_MAC} from '@lib/constants';
import RPC from '@lib/rpc_frontend';
import State from '@lib/state';

/* MAIN */

const LayoutShiftHighlighter: ToolConfig<LayoutShiftHighlighterState> = {
  id: 'layout-shift-highlighter',
  name: 'Layout Shift Highlighter',
  description: 'Toggle the layout shift highlighter, to spot unexpected layout shifts happening in the page',
  enabled: true,
  command: 'devbox.layout-shift-highlighter.toggle',
  shortcut: IS_MAC ? 'Ctrl+Cmd+J' : 'Ctrl+Alt+Shift+J',
  state: State.layoutShiftHighlighter,
  trigger: useToolTrigger ( (): Disposer => {
    State.layoutShiftHighlighter.active ( true );
    RPC.debuggerCall ( 'Overlay.setShowLayoutShiftRegions', { result: true }, 1 );
    return (): void => {
      State.layoutShiftHighlighter.active ( false );
      RPC.debuggerCall ( 'Overlay.setShowLayoutShiftRegions', { result: false }, -1 );
    };
  }, State.layoutShiftHighlighter.active )
};

/* EXPORT */

export default LayoutShiftHighlighter;
