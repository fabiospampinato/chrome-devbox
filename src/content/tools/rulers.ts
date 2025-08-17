
/* IMPORT */

import {$} from 'voby';
import useRulers from '@hooks/use_rulers';
import useRootDispose from '@hooks/use_root_dispose';
import useToolTrigger from '@hooks/use_tool_trigger';

/* MAIN */

const Rulers: ToolConfig = {
  id: 'rulers',
  name: 'Rulers',
  description: 'Toggle the rulers overlay, to spot misalignment issues in the page',
  command: 'devbox.rulers.toggle',
  shortcut: 'Ctrl+Cmd+R',
  active: $(false),
  trigger: useToolTrigger ( (): Disposer => {
    Rulers.active?.( true );
    const dispose = useRootDispose ( useRulers );
    return (): void => {
      Rulers.active?.( false );
      dispose ();
    };
  })
};

/* EXPORT */

export default Rulers;
