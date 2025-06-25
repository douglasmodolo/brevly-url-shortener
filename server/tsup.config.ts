import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/env.ts',
    'src/shared/either.ts',
    'src/app/**/*.ts',
    'src/infra/http/**/*.ts',
    'src/infra/db/schemas/**/*.ts',
    'src/infra/db/index.ts'
  ],
  outDir: 'dist',
  target: 'node20',
  format: ['cjs'],
  clean: true,
  dts: false,
  sourcemap: false,
})
