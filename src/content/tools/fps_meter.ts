
/* IMPORT */

import useToolTrigger from '@hooks/use_tool_trigger';
import Debugger from '@lib/debugger';

/* MAIN */

const FPSMeter: ToolConfig = {
  id: 'fps-meter',
  name: 'FPS Meter',
  command: 'devbox.fps-meter.toggle',
  shortcut: 'Ctrl+Cmd+F',
  trigger: useToolTrigger ( (): Disposer => {
    Debugger.callInWorker ( 'Overlay.setShowFPSCounter', { show: true }, 1 );
    return (): void => {
      Debugger.callInWorker ( 'Overlay.setShowFPSCounter', { show: false }, -1 );
    };
  })
};

/* EXPORT */

export default FPSMeter;
