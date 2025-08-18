
/* IMPORT */

import {$} from 'voby';

/* MAIN */

const State: State = {
  animationThrottler: {
    active: $(false)
  },
  cpuThrottler: {
    active: $(false)
  },
  customElementOutliner: {
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
  }
};

/* EXPORT */

export default State;
