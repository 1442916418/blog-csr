import { h, nextTick } from 'vue'

import type { SetupContext, VNode } from 'vue'

import { getType } from '@/components/custom/utils/common'

interface Props {
  show: boolean
  className: string
}
interface Params {
  show?: boolean
  handler?: (node: VNode) => void
  class?: undefined
}

const params: Params = {
  show: false,
  handler: void 0,
  class: void 0
}

const log = console.log
const abstractComponent = ['RouterView', 'KeepAlive']

const handleAddClassName = (slot: VNode) => {
  const el = slot.el

  if (el) {
    if (el.nodeType === 1) {
      el.classList.add(params.class)
    } else {
      ;(el.data || {}).staticClass += ` ${params.class}`
    }
  }
}
const handleRemoveClassName = (slot: VNode) => {
  const el = slot.el

  if (el && el.nodeType === 1) {
    if (el.classList && el.classList.includes(params.class)) {
      el.classList.remove(params.class)
    } else if ((el.data || {}).staticClass) {
      el.data.staticClass = el.data.staticClass.replace(` ${params.class}`, '')
    }
  }
}
const handleSlotType = (slot: VNode) => {
  switch (getType(slot.type)) {
    case 'String':
      handleItemStringType(slot)
      break
    case 'Object':
      handleItemObjectType(slot)
      break
  }
}
const handleItemStringType = (node: VNode) => {
  console.log('🚀 String node', node, '\n')
  const child = node?.children ?? []

  params.handler && params.handler(node)

  if (getType(child) === 'Array') {
    // @ts-ignore
    child.forEach((item) => handleSlotType(item))
  }
}
const handleAbstractComponentItem = (node: VNode) => {
  console.log('🚀 Abstract component node', node, '\n')
  const com = node.component
  const type = node.type

  // @ts-ignore
  if (com && type.setup) {
    // @ts-ignore
    const ele = type.setup(type.props, com)
    console.log('🚀 ~ file: skeleton.ts ~ line 78 ~ handleAbstractComponentItem ~ ele', ele)
  }
}
const handleItemObjectType = (node: VNode) => {
  console.log('🚀 Object node', node, '\n')
  const dataType = node.type

  // @ts-ignore
  if (abstractComponent.includes(dataType.name)) {
    log('Abstract component')
    handleAbstractComponentItem(node)
    // @ts-ignore
  } else if (dataType?.__file) {
    log('Custom component')
    handleItemStringType(node)
  }
}
const handleElements = (slots: VNode[]) => {
  if (!slots.length) return

  slots.forEach((item) => handleSlotType(item))
}

const skeleton = (props: Props, context: SetupContext) => {
  const { slots } = context
  const slotsElements = (slots.default && slots.default()) || [h('')]

  const show = props?.show ?? false
  Object.assign(params, {
    show,
    class: props?.className ?? 'g-skeleton',
    handler: show ? handleAddClassName : handleRemoveClassName
  })

  nextTick(() => handleElements(slotsElements))

  return slotsElements?.length ? h('div', null, slotsElements) : slotsElements
}

skeleton.props = ['show', 'className']

export default skeleton
