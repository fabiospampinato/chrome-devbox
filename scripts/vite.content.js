
/* IMPORT */

import {defineConfig} from 'vite';
import voby from 'voby-vite';
import manifest from '../manifest.json';
import assets from './plugin_assets';
import strict from './plugin_strict';

/* MAIN */

const config = defineConfig ( ({ mode }) => ({
  build: {
    emptyOutDir: false,
    minify: mode === 'production',
    rollupOptions: {
      input: {
        contentAll: manifest.content_scripts[0].ts[0]
      },
      output: {
        entryFileNames: 'assets/[name].js'
      }
    }
  },
  plugins: [
    assets (),
    strict ( 'contentAll.js' ),
    voby ()
  ]
}));

/* EXPORT */

export default config;
