
/* IMPORT */

import {defineConfig} from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

/* MAIN */

const config = defineConfig ( ({ mode }) => ({
  build: {
    assetsInlineLimit: Infinity,
    emptyOutDir: false,
    minify: mode === 'production',
    rollupOptions: {
      input: {
        background: './src/background/worker.ts',
      },
      output: {
        entryFileNames: 'assets/[name].js'
      }
    }
  },
  plugins: [
    tsconfigPaths ()
  ]
}));

/* EXPORT */

export default config;
