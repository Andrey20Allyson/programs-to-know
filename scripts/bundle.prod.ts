import { build } from 'esbuild';

async function main() {
  return build({
    entryPoints: [
      './src/client/index.tsx',
    ],
    bundle: true,
    target: 'es2020',
    minify: true,
    outdir: './public'
  });
}

main();