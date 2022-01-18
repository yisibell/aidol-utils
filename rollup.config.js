import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'es'
    },
    {
      file: pkg.browser,
      format: 'umd',
      name: 'AidolUtils'
    },
   
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    })
  ]
}