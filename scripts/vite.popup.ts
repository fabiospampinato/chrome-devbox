
/* IMPORT */

import {defineConfig} from 'vite';
import voby from 'voby-vite';
import manifest from '../manifest.json';
import strict from './plugin_strict';

/* MAIN */

const config = defineConfig ( ({ mode }) => ({
  build: {
    emptyOutDir: false,
    minify: mode === 'production',
    rollupOptions: {
      input: {
        popup: manifest.action.default_popup
      },
      output: {
        entryFileNames: 'assets/[name].js'
      }
    }
  },
  plugins: [
    strict ( 'popup.js' ),
    voby ()
  ]
}));

/* EXPORT */

export default config;
