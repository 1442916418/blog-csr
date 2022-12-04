import { nextTick } from 'vue'

/**
 * 设置页面风格
 * @param name - 当前路由名称
 * @param presetName 预设路由名称
 * @param className 类名
 */
export default function (name: string, presetName = ['home'], className = 'anniversary') {
  nextTick(() => {
    const body = document.body

    if (body && name) {
      if (presetName.includes(name)) {
        if (body.classList.contains(className)) {
          body.classList.remove(className)
        } else {
          body.classList.add(className)
        }
      } else {
        body.classList.contains(className) && body.classList.remove(className)
      }
    }
  })
}
