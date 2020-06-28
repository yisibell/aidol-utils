/**
 * WebSocket 通信服务
 * @author: hongwenqing
 * @date: 2019-12-3
 */
import getType from './getType'

// ws 创建函数
const createWebSocket = (Vue, options) => {
  const { heart_interval = 50000, api, open, vue_emit_name } = options
  const WsBus = new Vue()
  let WS = {}
  let timer = null
  let is_open_ws = true

  try {
    is_open_ws = getType(open) === 'String' ? JSON.parse(open) : open
  } catch (err) {
    is_open_ws = true
    console.error('the open property should be a truly value.')
  }

  if (is_open_ws) WS = new WebSocket(api);

  WS.onopen = function(e) {
    console.log('ws connected...')
    WS_CONNECT_COUNT = 0
    WsBus.$emit(vue_emit_name.onopen, e)
    WS.send('heart')
    clearInterval(timer)
    timer = setInterval(() => {
      WS.send('heart')
    }, Number.parseInt(heart_interval))
    options.onopen && options.onopen(e)
  }

  WS.onmessage = function(e) {
    const json_data = JSON.parse(e.data)
    WsBus.$emit(vue_emit_name.onmessage, json_data)
    options.onmessage && options.onmessage(json_data)
  }

  WS.onerror = function(err) {
    console.log('ws error!')
    WsBus.$emit('ws_reconnect', err)
    WsBus.$emit(vue_emit_name.onerror, err)
    clearInterval(timer)
    options.onerror && options.onerror(err)
  }

  WS.onclose = function(e) {
    console.log('ws closed!')
    WsBus.$emit('ws_reconnect', e)
    WsBus.$emit(vue_emit_name.onclose, e)
    clearInterval(timer)
    options.onclose && options.onclose(e)
  }

  return { WS, WsBus }
}

// 默认的 vue emit event name
const defaultVueEmitName = () => ({
  onopen: 'ws_open',
  onmessage: 'ws_message',
  onerror: 'ws_error',
  onclose: 'ws_close'
})

// ws 安装函数
const install = (Vue, options = {}) => {
  
  if (!options.vue_emit_name || JSON.stringify(options.vue_emit_name) === '{}') {
    options.vue_emit_name = defaultVueEmitName()
  }

  const $ws = createWebSocket(Vue, options)
  Vue.prototype.$ws = $ws
  const { WsBus } = $ws
  const { reconnect_limit, reconnect_limit_msg, reconnect_msg, vue_emit_name } = options

  WsBus.$on('ws_reconnect', () => {
    if (WS_CONNECT_COUNT > reconnect_limit) {
      const msg = reconnect_limit_msg || `The number of ws reconnections has exceeded ${reconnect_limit}，you can refresh to reconnect the ws server!`

      console.warn(msg)
      return
    }
    setTimeout(() => {
      ++WS_CONNECT_COUNT;
      let msg = `ws reconnect the ${WS_CONNECT_COUNT}th time ...`

      if (getType(reconnect_msg) === 'Function') {
        msg = reconnect_msg(WS_CONNECT_COUNT)
      } else if (reconnect_msg) {
        msg = reconnect_msg
      }

      console.log(msg)
      install(Vue, options)
    }, 3000)
  })
}

// ws 重连计数
export let WS_CONNECT_COUNT = 0

export default { install, WS_CONNECT_COUNT, defaultVueEmitName, createWebSocket }