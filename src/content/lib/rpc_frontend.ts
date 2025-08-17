
/* IMPORT */

import frontend from 'chrome-rpc/frontend';
import type Procedures from '@lib/rpc_backend.procedures';

/* MAIN */

const RPC = frontend<typeof Procedures>();

/* EXPORT */

export default RPC;
