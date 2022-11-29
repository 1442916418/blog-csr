import { h, nextTick } from 'vue'

import type { SetupContext, VNode } from 'vue'

import { getType } from '@/components/custom/utils/common'

interface Props {
  show: boolean
  className?: string
  /** 根据类名排除元素 */
  excludeClassName?: string[]
  /** 根据标签名称排除元素 */
  excludeElements?: string[]
  /** 防抖 */
  throttle?: number
}
interface Params extends Props {
  handler?: (node: VNode) => void
}

const params: Params = {
  show: false,
  handler: void 0,
  className: void 0,
  excludeClassName: [],
  excludeElements: [],
  throttle: 0
}

const isExcludeClassName = (className: string) => {
  if (!className || typeof className !== 'string' || !params.excludeClassName?.length) return false

  const find = params.excludeClassName.find((v) => className.includes(v))

  return !!find
}
const isExcludeElements = (ele: string) => {
  if (!ele || !params.excludeElements?.length) return false

  return params.excludeElements.includes(ele.toLowerCase())
}
const isMatch = (node: VNode) => {
  const el = node.el

  if (!el) return false

  return el.nodeType === 1 && !isExcludeClassName(el.className) && !isExcludeElements(el.tagName)
}
const handleAddClassName = (node: VNode) => {
  if (isMatch(node)) {
    node.el?.classList.add(params.className)
  }
}
const handleRemoveClassName = (node: VNode) => {
  if (isMatch(node)) {
    const el = node.el

    if (!el) return

    if (el.classList && el.classList.contains(params.className)) {
      el.classList.remove(params.className)
    }
  }
}
const handleElement = (node: VNode) => {
  params.handler && params.handler(node)

  if (node.children && getType(node.children) === 'Array') {
    // @ts-ignore
    node.children.forEach((item) => handleElement(item))
  }

  const children = node.component?.subTree.children || []

  if (children && getType(children) === 'Array') {
    // @ts-ignore
    children.forEach((item) => handleElement(item))
  }
}
const handleElements = (slots: VNode[]) => {
  if (!slots.length) return

  slots.forEach((item) => handleElement(item))
}

// TODO: 循环列表，图片，开销
const skeleton = (props: Props, context: SetupContext) => {
  const { slots } = context
  const slotsElements = (slots.default && slots.default()) || [h('')]

  const show = props?.show ?? false
  Object.assign(params, {
    show,
    className: props?.className ?? 'g-skeleton',
    excludeClassName: props?.excludeClassName ?? [],
    excludeElements: props?.excludeElements ?? [],
    throttle: props?.throttle ?? 0,
    handler: show ? handleAddClassName : handleRemoveClassName
  })

  if (params.show) {
    nextTick(() => handleElements(slotsElements))
  } else {
    if (params.throttle) {
      setTimeout(() => {
        nextTick(() => handleElements(slotsElements))
      }, params.throttle)
    } else {
      nextTick(() => handleElements(slotsElements))
    }
  }

  return slotsElements?.length ? h('div', slotsElements) : slotsElements
}

skeleton.props = ['show', 'className', 'excludeClassName', 'excludeElements', 'throttle']

export default skeleton
