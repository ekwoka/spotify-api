import { build } from 'esbuild';
import { writeFile, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { gzipSize } from 'gzip-size';
import prettyBytes from 'pretty-bytes';

const { outputFiles } = await build({
  entryPoints: ['./src/index.ts'],
  inject: [],
  outfile: 'testing/bundle.js',
  write: false,
  splitting: false,
  format: 'esm',
  bundle: true,
  target: 'esnext',
  platform: 'node',
  minify: true,
  plugins: [],
});
const { minified, gzipped } = await getSizes(outputFiles[0].contents);
const content = JSON.stringify(
  {
    minified,
    gzipped,
  },
  null,
  2
);
const old = JSON.parse(await readFile(join('size.json'), 'utf8'));
await writeFile(join('size.json'), content, 'utf8');
console.log(
  `Package size: ${old.minified.pretty} => ${minified.pretty}: ${prettyBytes(
    minified.raw - old.minified.raw
  )}`
);
console.log(
  `Minzipped size: ${old.gzipped.pretty} => ${gzipped.pretty}: ${prettyBytes(
    gzipped.raw - old.gzipped.raw
  )}`
);

function sizeInfo(bytesSize) {
  return {
    pretty: prettyBytes(bytesSize),
    raw: bytesSize,
  };
}

function getBytes(str) {
  return Buffer.byteLength(str, 'utf8');
}

async function getSizes(code) {
  const minifiedSize = getBytes(code);
  const gzippedSize = await gzipSize(code);

  return { minified: sizeInfo(minifiedSize), gzipped: sizeInfo(gzippedSize) };
}
