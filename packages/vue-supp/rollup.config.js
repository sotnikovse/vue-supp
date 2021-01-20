import ts from 'rollup-plugin-typescript2'
import analyze from 'rollup-plugin-analyzer'
import json from '@rollup/plugin-json'
import pkg from './package.json'

const outputConfigs = {
  'esm': {
    file: pkg.module,
    format: 'es',
    plugins: [analyze({ summaryOnly: true })],
  },
  cjs: {
    file: pkg.main,
    format: 'cjs'
  },
}

const packageConfigs = ['esm', 'cjs'].map(format => createConfig(format, outputConfigs[format]))

export default packageConfigs

function createConfig (format, output, plugins = []) {
  if (!output) {
    console.log(require('chalk').yellow(`invalid format: "${format}"`))
    process.exit(1)
  }

  const tsPlugin = ts({
    check: false,
    tsconfig: './tsconfig.json',
    cacheRoot: './node_modules/.rts2_cache',
    tsconfigOverride: {
      compilerOptions: {
        sourceMap: true,
        declaration: true,
      },
      exclude: ['node_modules', '**/__tests__']
    }
  })

  const external = [
    'vue',
    '@popperjs/core',
    'tslib',
  ]

  const nodePlugins =
    format !== 'cjs'
      ? [
          require('@rollup/plugin-node-resolve').nodeResolve({
            preferBuiltins: true
          }),
          require('@rollup/plugin-commonjs')({
            sourceMap: false
          }),
          require('rollup-plugin-node-builtins')(),
          require('rollup-plugin-node-globals')()
        ]
      : []

  return {
    input: './src/index.ts',
    external,
    plugins: [
      json({
        namedExports: false
      }),
      tsPlugin,
      ...nodePlugins,
      ...plugins
    ],
    output,
    treeshake: {
      moduleSideEffects: false
    }
  }
}
