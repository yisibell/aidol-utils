/**
 * 水印生成工具
 * 调用方式: canvasWaterMark({ content: 'QQMusicFE' })
 * @author hongwenqing(elenh)
 * @date 2020-07-27
 * @param {}
 * @return
 */
export default function canvasWaterMark(
  {
    container,
    width = '300px',
    height = '300px',
    textAlign = 'center',
    textBaseline = 'middle',
    font = '20px Microsoft Yahei',
    fillStyle = 'rgba(184, 184, 184, 0.3)',
    content = '@aidol/utils',
    rotate = '30',
    zIndex = 1024,
    observe = true, // 是否监视 DOM 变更
    open = true // 是否开启
  } = {}
) {
  if (!open) return

  container = (typeof container === 'string') ? document.querySelector(container) : document.body
  const args = arguments[0]
  const canvas = document.createElement('canvas')
  canvas.setAttribute('width', width)
  canvas.setAttribute('height', height)
  const ctx = canvas.getContext('2d')
  ctx.textAlign = textAlign
  ctx.textBaseline = textBaseline
  ctx.font = font
  ctx.fillStyle = fillStyle
  ctx.rotate(Math.PI / 180 * rotate)
  ctx.fillText(content, parseFloat(width) / 2, parseFloat(height) / 2)
  const base64Url = canvas.toDataURL()
  const __wm = document.querySelector('.__wm')
  const watermarkDiv = __wm || document.createElement('div')
  const styleStr = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%; 
    z-index: ${zIndex};
    pointer-events: none;
    background-repeat: repeat;
    background-image: url('${base64Url}')`

  watermarkDiv.setAttribute('style', styleStr)
  watermarkDiv.classList.add('__wm')

  if (!__wm) {
    container.style.position = 'relative'
    container.insertBefore(watermarkDiv, container.firstChild)
  }

  const MutationObserver = window.MutationObserver || window.WebKitMutationObserver
  if (observe && MutationObserver) {
    let mo = new MutationObserver(function() {
      const __wm = document.querySelector('.__wm') // 只在__wm元素变动才重新调用 canvasWaterMark
      if ((__wm && __wm.getAttribute('style') !== styleStr) || !__wm) { // 避免一直触发
        mo.disconnect(); mo = null
        canvasWaterMark(JSON.parse(JSON.stringify(args)))
      }
    })
    mo.observe(container, { attributes: true, subtree: true, childList: true })
  }
}