
/* IMPORT */

import fs from 'node:fs/promises';

/* MAIN */

const strict = fileName => {

  return {
    name: 'plugin:strict',
    writeBundle: async () => {
      const content = await fs.readFile ( `dist/assets/${fileName}`, 'utf-8' );
      const contentStrict = `"use strict";\n${content}`;
      return fs.writeFile ( `dist/assets/${fileName}`, contentStrict );
    }
  };

};

/* EXPORT */

export default strict;
