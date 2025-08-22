
/* IMPORT */

import platform from 'isoplatform';

/* MAIN */

const IS_DEV = import.meta.env.MODE === 'development';
const IS_MAC = platform === 'mac';

/* EXPORT */

export {IS_DEV, IS_MAC};
