
/* IMPORT */

import useToolTrigger from '@hooks/use_tool_trigger';
import {IS_DEV} from '@lib/constants';
import RPC from '@lib/rpc_frontend';

/* MAIN */

const ExtensionReloader: ToolConfig<{}> = {
  id: 'extension-reloader',
  name: 'Extension Reloader',
  description: 'Trigger an extension reload, to update it',
  enabled: IS_DEV,
  command: 'devbox.extension-reloader.trigger',
  shortcut: 'CmdOrCtrl+R',
  state: {},
  trigger: useToolTrigger ( (): void => {
    RPC.extensionReload ();
    setTimeout ( () => {
      window.location.reload ();
    }, 150 );
  })
};

/* EXPORT */

export default ExtensionReloader;
