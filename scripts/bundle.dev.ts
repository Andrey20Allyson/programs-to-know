import { build, context } from 'esbuild';

async function main() {
  const ctx = await context({
    entryPoints: [
      './src/client/index.tsx'
    ],
    bundle: true,
    sourcemap: true,
    outdir: './public',
    target: 'es2020',
  });

  await ctx.watch();
  
  console.log('bundle started');
}

main();