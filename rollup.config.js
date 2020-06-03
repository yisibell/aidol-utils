import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/aidol-utils.umd.js',
      format: 'umd',
      name: 'AidolUtils'
    },
    {
      file: 'dist/aidol-utils.es.js',
      format: 'es'
    }
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    })
  ]
}