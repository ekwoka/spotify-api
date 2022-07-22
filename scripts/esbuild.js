import { build } from 'esbuild';
import { getAllTypeScript } from './utils/getAllTypescript.js';

const paths = await getAllTypeScript(['./src'], ['.ts']);
console.time('esbuild');
build({
  entryPoints: paths,
  outdir: './dist',
  inject: [],
  splitting: false,
  format: 'esm',
  bundle: false,
  target: 'esnext',
  platform: 'node',
  minify: false,
  plugins: [],
}).then(async (res) => {
  console.log('JS Build Complete');
  console.timeEnd('esbuild');
});
