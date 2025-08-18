
/* IMPORT */

import useMutationHighlighter from '@hooks/use_mutation_highlighter';
import useRootDispose from '@hooks/use_root_dispose';
import useToolTrigger from '@hooks/use_tool_trigger';
import State from '@lib/state';

/* MAIN */

const MutationHighlighter: ToolConfig<MutationHighlighterState> = {
  id: 'mutation-highlighter',
  name: 'Mutation Highlighter',
  description: 'Toggle the mutation highlighter, to spot unnecessary mutations happening in the page',
  command: 'devbox.mutation-highlighter.toggle',
  shortcut: 'Ctrl+Cmd+M',
  state: State.mutationHighlighter,
  trigger: useToolTrigger ( (): Disposer => {
    State.mutationHighlighter.active ( true );
    const dispose = useRootDispose ( useMutationHighlighter );
    return (): void => {
      State.mutationHighlighter.active ( false );
      dispose ();
    };
  }, State.mutationHighlighter.active )
};

/* EXPORT */

export default MutationHighlighter;
