
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
        options: manifest.options_page
      },
      output: {
        entryFileNames: 'assets/[name].js'
      }
    }
  },
  plugins: [
    strict ( 'options.js' ),
    voby ()
  ]
}));

/* EXPORT */

export default config;
