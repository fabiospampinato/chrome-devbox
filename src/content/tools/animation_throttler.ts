
/* IMPORT */

import {$} from 'voby';
import useToolTrigger from '@hooks/use_tool_trigger';
import RPC from '@lib/rpc_frontend';

/* MAIN */

//FIXME: Figure out why this thing doesn't work...

const AnimationThrottler: ToolConfig = {
  id: 'animation-throttler',
  name: 'Animation Throttler',
  description: 'Toggle 5x animation speed throttling, to spot issues with animations in the page',
  command: 'devbox.animation-throttler.toggle',
  shortcut: 'Ctrl+Cmd+A',
  active: $(false),
  trigger: useToolTrigger ( (): Disposer => {
    AnimationThrottler.active?.( true );
    RPC.debuggerCall ( 'Animation.setPlaybackRate', { playbackRate: 0.2 }, 1 );
    return (): void => {
      AnimationThrottler.active?.( false );
      RPC.debuggerCall ( 'Animation.setPlaybackRate', { playbackRate: 1 }, -1 );
    };
  })
};

/* EXPORT */

export default AnimationThrottler;
