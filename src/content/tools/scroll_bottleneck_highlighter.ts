
/* IMPORT */

import {$} from 'voby';
import useToolTrigger from '@hooks/use_tool_trigger';
import RPC from '@lib/rpc_frontend';

/* MAIN */

const ScrollBottleneckHighlighter: ToolConfig = {
  id: 'scroll-bottleneck-highlighter',
  name: 'Scroll Bottleneck Highlighter',
  description: 'Toggle the scroll bottleneck highlighter, to spot scroll smoothness issues in the page, maybe',
  command: 'devbox.scroll-bottleneck-highlighter.toggle',
  shortcut: 'Ctrl+Cmd+S',
  active: $(false),
  trigger: useToolTrigger ( (): Disposer => {
    ScrollBottleneckHighlighter.active?.( true );
    RPC.debuggerCall ( 'Overlay.setShowScrollBottleneckRects', { show: true }, 1 );
    return (): void => {
      ScrollBottleneckHighlighter.active?.( false );
      RPC.debuggerCall ( 'Overlay.setShowScrollBottleneckRects', { show: false }, -1 );
    };
  })
};

/* EXPORT */

export default ScrollBottleneckHighlighter;
