
/* IMPORT */

import {$} from 'voby';
import EventEmitter from '@lib/event_emitter';

/* MAIN */

const State: State = {
  animationThrottler: {
    active: $(false)
  },
  cpuThrottler: {
    active: $(false)
  },
  dashboard: {
    active: $(false)
  },
  elementOutliner: {
    active: $(false)
  },
  fpsMeter: {
    active: $(false)
  },
  lagRadar: {
    active: $(false)
  },
  layerOutliner: {
    active: $(false)
  },
  mutationHighlighter: {
    active: $(false)
  },
  paintHighlighter: {
    active: $(false)
  },
  rulers: {
    active: $(false)
  },
  scrollBottleneckHighlighter: {
    active: $(false)
  },
  webComponentOutliner: {
    active: $(false)
  }
};

/* INIT */

//TODO: Write this better, we are resetting some state when the debugger is externally detached

EventEmitter.on ( 'devbox.debugger.detached', () => {
  State.animationThrottler.active ( false );
  State.cpuThrottler.active ( false );
  State.fpsMeter.active ( false );
  State.layerOutliner.active ( false );
  State.paintHighlighter.active ( false );
  State.scrollBottleneckHighlighter.active ( false );
});

/* EXPORT */

export default State;
