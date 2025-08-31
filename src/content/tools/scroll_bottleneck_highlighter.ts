
/* IMPORT */

import useToolTrigger from '@hooks/use_tool_trigger';
import {IS_MAC} from '@lib/constants';
import RPC from '@lib/rpc_frontend';
import State from '@lib/state';

/* MAIN */

const ScrollBottleneckHighlighter: ToolConfig<ScrollBottlenckHighlighterState> = {
  id: 'scroll-bottleneck-highlighter',
  name: 'Scroll Bottleneck Highlighter',
  description: 'Toggle the scroll bottleneck highlighter, to spot scroll smoothness issues in the page, maybe',
  enabled: true,
  command: 'devbox.scroll-bottleneck-highlighter.toggle',
  shortcut: IS_MAC ? 'Ctrl+Cmd+S' : 'Ctrl+Alt+Shift+S',
  state: State.scrollBottleneckHighlighter,
  trigger: useToolTrigger ( (): Disposer => {
    State.scrollBottleneckHighlighter.active ( true );
    RPC.debuggerCall ( 'Overlay.setShowScrollBottleneckRects', { show: true }, 1 );
    return (): void => {
      State.scrollBottleneckHighlighter.active ( false );
      RPC.debuggerCall ( 'Overlay.setShowScrollBottleneckRects', { show: false }, -1 );
    };
  }, State.scrollBottleneckHighlighter.active)
};

/* EXPORT */

export default ScrollBottleneckHighlighter;
