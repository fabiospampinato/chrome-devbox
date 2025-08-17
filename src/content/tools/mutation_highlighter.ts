
/* IMPORT */

import useMutationHighlighter from '@hooks/use_mutation_highlighter';
import useToolTrigger from '@hooks/use_tool_trigger';

/* MAIN */

const MutationHighlighter: ToolConfig = {
  id: 'mutation-highlighter',
  name: 'Mutation Highlighter',
  command: 'devbox.mutation-highlighter.toggle',
  shortcut: 'Ctrl+Cmd+M',
  trigger: useToolTrigger ( useMutationHighlighter )
};

/* EXPORT */

export default MutationHighlighter;
