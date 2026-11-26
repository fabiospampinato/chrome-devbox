
/* IMPORT */

import useToolTrigger from '@hooks/use_tool_trigger';
import {IS_MAC} from '@lib/constants';
import RPC from '@lib/rpc_frontend';
import State from '@lib/state';

/* HELPERS */

const SLOW_4G = { // Same preset as in DevTools
  urlPattern: '',
  latency: 150 * 3.75,
  downloadThroughput: 1.6 * 1000 * 1000 / 8 * .9,
  uploadThroughput: 750 * 1000 / 8 * .9
};

/* MAIN */

const NetworkThrottler: ToolConfig<NetworkThrottlerState> = {
  id: 'network-throttler',
  name: 'Network Throttler',
  description: 'Toggle Slow 4G network throttling, to spot loading performance issues in the page',
  enabled: true,
  command: 'devbox.network-throttler.toggle',
  shortcut: IS_MAC ? 'Ctrl+Cmd+N' : 'Ctrl+Alt+Shift+N',
  state: State.networkThrottler,
  trigger: useToolTrigger ( (): Disposer => {
    State.networkThrottler.active ( true );
    RPC.debuggerCall ( 'Network.enable', {}, 1 ).then ( () => { // Conditions are only applied while the "Network" domain is enabled
      RPC.debuggerCall ( 'Network.emulateNetworkConditionsByRule', { offline: false, matchedNetworkConditions: [SLOW_4G] }, 0 );
    });
    return (): void => {
      State.networkThrottler.active ( false );
      RPC.debuggerCall ( 'Network.disable', {}, -1 ); // Disabling the "Network" domain also removes the throttling
    };
  }, State.networkThrottler.active )
};

/* EXPORT */

export default NetworkThrottler;
