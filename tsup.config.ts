import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/cli/index.ts'],
  outDir: 'dist',
  target: 'node16',
  format: ['esm'],
  clean: true,
  dts: false,
  sourcemap: true,
  esbuildOptions(options) {
    options.alias = {
      '@': './src',
    };
  },
});
