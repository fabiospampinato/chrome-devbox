
/* IMPORT */

import useRootDispose from '@hooks/use_root_dispose';
import useToolTrigger from '@hooks/use_tool_trigger';
import useWebComponentOutliner from '@hooks/use_web_component_outliner';
import {IS_MAC} from '@lib/constants';
import State from '@lib/state';

/* MAIN */

const WebComponentOutliner: ToolConfig<WebComponentOutlinerState> = {
  id: 'wc-outliner',
  name: 'Web Component Outliner',
  description: 'Toggle the web component outliner, to spot where and which web components are used in the page',
  enabled: true,
  command: 'devbox.wc-outliner.toggle',
  shortcut: IS_MAC ? 'Ctrl+Cmd+W' : 'Ctrl+Alt+Shift+W',
  state: State.webComponentOutliner,
  trigger: useToolTrigger ( (): Disposer => {
    State.webComponentOutliner.active ( true );
    const dispose = useRootDispose ( useWebComponentOutliner );
    return (): void => {
      State.webComponentOutliner.active ( false );
      dispose ();
    };
  }, State.webComponentOutliner.active )
};

/* EXPORT */

export default WebComponentOutliner;
