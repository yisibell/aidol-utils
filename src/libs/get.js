/**
 * 根据 obj 对象的 path 路径获取值。 如果解析 value 是 undefined 会以 defaultValue 取代。
 * @author hongwenqing(elenh)
 * @date 2020-05-29
 * @param {object} obj 要检索的对象
 * @param {string | array} path 要获取属性的路径
 * @param {any} defaultValue 如果解析值是 undefined ，这值会被返回。
 * @return {any} 返回解析的值
 */
export default function(obj, path, defaultValue) {
  let res = obj
  let path_arr = []
  
  // 生成属性路径数组
  if (Array.isArray(path)) {
    path_arr = path
  } else {
    let keys = []
    try {
      keys = path.split('.')
    } catch(err) {
      throw new Error('path must be a String.')
    }
    keys.forEach(str => {
      let arr = []
      const first_prop = str.match(/^(\w+)\[?/)
      const index_arr = str.match(/\[(\d)\]+/g)

      if (Array.isArray(first_prop) && first_prop.length > 1) {
        arr.push(first_prop[1])
      }

      if (Array.isArray(index_arr)) {
        arr = arr.concat(index_arr.map(v => {
            const num = v.match(/\[(\d)+\]/)
            return Number.parseInt(num[1])
          })
        )
      }

      path_arr = path_arr.concat(arr)
      
    })
  }

  // 生成结果
  path_arr.forEach(key => {
    res = res[key]
  })

  return typeof res === 'undefined' ? defaultValue : res
}