
/* IMPORT */

import {$} from 'voby';
import useMutationHighlighter from '@hooks/use_mutation_highlighter';
import useRootDispose from '@hooks/use_root_dispose';
import useToolTrigger from '@hooks/use_tool_trigger';

/* MAIN */

const MutationHighlighter: ToolConfig = {
  id: 'mutation-highlighter',
  name: 'Mutation Highlighter',
  description: 'Toggle the mutation highlighter, to spot unnecessary mutations happening in the page',
  command: 'devbox.mutation-highlighter.toggle',
  shortcut: 'Ctrl+Cmd+M',
  active: $(false),
  trigger: useToolTrigger ( (): Disposer => {
    MutationHighlighter.active?.( true );
    const dispose = useRootDispose ( useMutationHighlighter );
    return (): void => {
      MutationHighlighter.active?.( false );
      dispose ();
    };
  })
};

/* EXPORT */

export default MutationHighlighter;
