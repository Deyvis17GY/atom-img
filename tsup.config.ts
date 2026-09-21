import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  target: 'es2020',
  // The stylesheet is compiled separately by the `build:css` script into
  // dist/index.css, the path consumers already import.
  external: ['react', 'react-dom'],
});
