import { build } from 'esbuild';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { gzipSize } from 'gzip-size';
import prettyBytes from 'pretty-bytes';

build({
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
  watch: false,
  /* {
    onRebuild(error, { outputFiles }) {
      console.log('ESBUILD:');
      console.log(outputFiles[0].contents.byteLength, 'bytes');
    },
  } */
  plugins: [],
}).then(async ({ outputFiles }) => {
  const { minified, gzipped } = await getSizes(outputFiles[0].contents);
  const content = JSON.stringify(
    {
      minified,
      gzipped,
    },
    null,
    2
  );
  await writeFile(join('size.json'), content, 'utf8');
  console.log(`New Package size: ${minified.pretty}`);
  console.log(`Minzipped size: ${gzipped.pretty}`);
});

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
