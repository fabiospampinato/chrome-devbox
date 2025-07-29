
/* IMPORT */

import fs from 'node:fs/promises';

/* MAIN */

const assets = () => {

  return {
    name: 'plugin:assets',
    writeBundle: async () => {
      await fs.cp ( 'resources/icon/icon-256.png', 'dist/resources/icon/icon-256.png', { recursive: true } );
      await fs.cp ( 'manifest.json', 'dist/manifest.json' );
    }
  };

};

/* EXPORT */

export default assets;
