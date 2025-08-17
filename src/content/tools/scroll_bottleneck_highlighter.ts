
/* IMPORT */

import useToolTrigger from '@hooks/use_tool_trigger';
import Debugger from '@lib/debugger';

/* MAIN */

const ScrollBottleneckHighlighter: ToolConfig = {
  id: 'scroll-bottleneck-highlighter',
  name: 'Scroll Bottleneck Highlighter',
  description: 'Toggle the scroll bottleneck highlighter, to spot scroll smoothness issues in the page, maybe',
  command: 'devbox.scroll-bottleneck-highlighter.toggle',
  shortcut: 'Ctrl+Cmd+S',
  trigger: useToolTrigger ( (): Disposer => {
    Debugger.callInWorker ( 'Overlay.setShowScrollBottleneckRects', { show: true }, 1 );
    return (): void => {
      Debugger.callInWorker ( 'Overlay.setShowScrollBottleneckRects', { show: false }, -1 );
    };
  })
};

/* EXPORT */

export default ScrollBottleneckHighlighter;
