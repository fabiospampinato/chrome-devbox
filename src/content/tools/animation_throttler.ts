
/* IMPORT */

import useToolTrigger from '@hooks/use_tool_trigger';
import RPC from '@lib/rpc_frontend';
import State from '@lib/state';

/* MAIN */

//FIXME: Figure out why this thing doesn't work...

const AnimationThrottler: ToolConfig<AnimationThrottlerState> = {
  id: 'animation-throttler',
  name: 'Animation Throttler',
  description: 'Toggle 5x animation speed throttling, to spot issues with animations in the page',
  command: 'devbox.animation-throttler.toggle',
  shortcut: 'Ctrl+Cmd+A',
  state: State.animationThrottler,
  trigger: useToolTrigger ( (): Disposer => {
    AnimationThrottler.state.active ( true );
    RPC.debuggerCall ( 'Animation.setPlaybackRate', { playbackRate: 0.2 }, 1 );
    return (): void => {
      AnimationThrottler.state.active ( false );
      RPC.debuggerCall ( 'Animation.setPlaybackRate', { playbackRate: 1 }, -1 );
    };
  })
};

/* EXPORT */

export default AnimationThrottler;
