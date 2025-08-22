
/* IMPORT */

import Debugger from '@lib/debugger';
import Extension from '@lib/extension';

/* MAIN */

const Procedures = {
  extensionReload: Extension.reload,
  debuggerCall: Debugger.call
};

/* EXPORT */

export default Procedures;
