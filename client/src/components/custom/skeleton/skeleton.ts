import { h, nextTick } from 'vue'

import type { SetupContext, VNode } from 'vue'

import { getType } from '@/components/custom/utils/common'

interface Props {
  show: boolean
  className?: string
  /** 根据类名排除元素 */
  exclude?: string[]
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
  exclude: [],
  throttle: 0
}

const isExclude = (className: string) => {
  if (!className || !params.exclude?.length) return false

  const find = params.exclude.find((v) => className.includes(v))

  return !!find
}
const handleAddClassName = (node: VNode) => {
  const el = node.el

  if (!el) return

  if (el.nodeType === 1 && !isExclude(el.className)) {
    el.classList.add(params.className)
  }
}
const handleRemoveClassName = (node: VNode) => {
  const el = node.el

  if (!el) return

  if (el.nodeType === 1) {
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

// TODO: 循环列表，图片，开销较大
const skeleton = (props: Props, context: SetupContext) => {
  const { slots } = context
  const slotsElements = (slots.default && slots.default()) || [h('')]

  const show = props?.show ?? false
  Object.assign(params, {
    show,
    className: props?.className ?? 'g-skeleton',
    exclude: props?.exclude ?? [],
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

skeleton.props = ['show', 'className', 'exclude', 'throttle']

export default skeleton
