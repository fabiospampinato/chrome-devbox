
/* IMPORT */

import usePointerHighlighter from '@hooks/use_pointer_highlighter';
import useRootDispose from '@hooks/use_root_dispose';
import useToolTrigger from '@hooks/use_tool_trigger';
import {IS_MAC} from '@lib/constants';
import State from '@lib/state';

/* MAIN */

const PointerHighlighter: ToolConfig<PointerHighlighterState> = {
  id: 'pointer-highlighter',
  name: 'Pointer Highlighter',
  description: 'Toggle the pointer highlighter, to make pointer interactions more visible',
  enabled: true,
  command: 'devbox.pointer-highlighter.toggle',
  shortcut: IS_MAC ? 'Ctrl+Cmd+O' : 'Ctrl+Alt+Shift+O',
  state: State.pointerHighlighter,
  trigger: useToolTrigger ( (): Disposer => {
    State.pointerHighlighter.active ( true );
    const dispose = useRootDispose ( usePointerHighlighter );
    return (): void => {
      State.pointerHighlighter.active ( false );
      dispose ();
    };
  }, State.pointerHighlighter.active )
};

/* EXPORT */

export default PointerHighlighter;
