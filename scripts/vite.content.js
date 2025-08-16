
/* IMPORT */

import {defineConfig} from 'vite';
import cssInjectedByJs from 'vite-plugin-css-injected-by-js';
import tsconfigPaths from 'vite-tsconfig-paths';
import voby from 'voby-vite';
import manifest from '../manifest.json';
import assets from './plugin_assets';
import strict from './plugin_strict';

/* MAIN */

const config = defineConfig ( ({ mode }) => ({
  build: {
    assetsInlineLimit: Infinity,
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
    cssInjectedByJs (),
    strict ( 'contentAll.js' ),
    tsconfigPaths (),
    voby ()
  ]
}));

/* EXPORT */

export default config;
