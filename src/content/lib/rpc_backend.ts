
/* IMPORT */

import backend from 'chrome-rpc/backend';
import Procedures from '@lib/rpc_backend.procedures';

/* MAIN */

const RPC = {

  init: (): void => {

    backend ({
      procedures: Procedures
    });

  }

};

/* EXPORT */

export default RPC;
