/**
*@author: hongwenqing
*@date: 2019-12-3
*@desc: WebSocket 通信服务
*/
import getType  from './getType'

// ws 重连计数
export let WS_CONNECT_COUNT = 0

// ws 创建函数
const createWebSocket = (Vue, options) => {
  const WsBus = new Vue()
  let WS = {}
  let timer = null
  const { heart_interval = 50000, api, open, vue_emit_name } = options
  const { onopen = 'ws_open', onmessage = 'ws_message', onerror = 'ws_error', onclose = 'ws_close' } = vue_emit_name || {}
  let is_open_ws = true

  try {
    is_open_ws = getType(open) === 'String' ? JSON.parse(open) : open
  } catch (err) {
    is_open_ws = true
    console.error('the open property should be a truly value.')
  }

  if (is_open_ws) WS = new WebSocket(api)

  WS.onopen = function(e) {
    console.log('ws connected...')
    WS_CONNECT_COUNT = 0
    WsBus.$emit(onopen, e)
    WS.send('heart')
    clearInterval(timer)
    timer = setInterval(() => {
      WS.send('heart')
    }, Number.parseInt(heart_interval))
    options.onopen && options.onopen(e)
  }

  WS.onmessage = function(e) {
    const json_data = JSON.parse(e.data)
    WsBus.$emit(onmessage, json_data)
    options.onmessage && options.onmessage(json_data)
  }

  WS.onerror = function(err) {
    WsBus.$emit(onerror, err)
    clearInterval(timer)
    options.onerror && options.onerror(err)
  }

  WS.onclose = function(e) {
    console.log('ws closed...')
    WsBus.$emit(onclose, e)
    clearInterval(timer)
    options.onclose && options.onclose(e)
  }

  return { WS, WsBus }
}

// ws 安装函数
const install = (Vue, options = {}) => {
  const $ws = createWebSocket(Vue, options)
  Vue.prototype.$ws = $ws
  const { WsBus } = $ws
  const { reconnect_limit, reconnect_limit_msg, reconnect_msg } = options

  WsBus.$on('ws_close', () => {
    if (WS_CONNECT_COUNT > reconnect_limit) {
      const msg = reconnect_limit_msg || `The number of ws reconnections has exceeded ${reconnect_limit}，you can refresh to reconnect the ws server!`

      console.warn(msg)
      return
    }
    setTimeout(() => {
      ++WS_CONNECT_COUNT
      let msg = `ws reconnect the ${WS_CONNECT_COUNT}th time ...`

      if (getType(reconnect_msg) === 'Function') {
        msg = reconnect_msg(WS_CONNECT_COUNT)
      } else if (reconnect_msg) {
        msg = reconnect_msg
      }

      console.log(msg)
      install(Vue)
    }, 3000)
  })
}

export default { install }