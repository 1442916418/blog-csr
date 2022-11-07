import { shallowReactive, createVNode, render } from 'vue'

import type { ComponentInternalInstance, VNode } from 'vue'
import MessageConstructor from './message.vue'

export interface MessageHandler {
  close: () => void
}

interface MessageProps {
  message: string
  type?: 'default' | 'success' | 'warning' | 'danger'
  duration?: number
}

export type MessageContext = {
  id: string
  vNode: VNode
  handler: MessageHandler
  vm: ComponentInternalInstance
  props: MessageProps
}

export class Message {
  private static index = 1
  private static instances: MessageContext[] = shallowReactive([])

  // BUG: 移除功能
  public static init = (props: MessageProps) => {
    this.removeMessage()

    const instance = this.createMessage(props)

    this.instances.push(instance)
  }

  private static createMessage = (props: MessageProps) => {
    const body = document.querySelector('body')

    if (!body) {
      throw new Error('Body element is undefined.')
    }

    if (!('duration' in props) || !props.duration) {
      props.duration = 3000
    }

    const container = document.createElement('div')
    const id = `y-message_${this.index++}`
    const that = this

    const vNode = createVNode(MessageConstructor, {
      id,
      ...props,
      onClose: () => {
        that.closeMessage(instance)
      }
    })

    render(vNode, container)

    container.firstElementChild && body?.appendChild(container.firstElementChild)

    const vm = vNode.component!
    const handler = {
      close: () => {
        vm.exposeProxy!.visible = false
      }
    }

    const instance = {
      id,
      vNode,
      vm,
      handler,
      props: (vNode.component as any).props
    }

    return instance
  }

  private static closeMessage = (instance: MessageContext) => {
    const idx = this.instances.indexOf(instance)

    if (idx === -1) return

    this.instances.splice(idx, 1)

    instance?.handler?.close()
  }

  private static removeMessage = () => {
    const max = 5
    const instances = this.instances

    if (!instances.length || instances.length <= max) return

    instances.forEach((v, i) => {
      if (i < 5) {
        const ele = document.getElementById(v.id)
        console.log('🚀 ~ file: message.ts ~ line 100 ~ Message ~ instances.forEach ~ ele', ele)

        ele && document.body.removeChild(ele)
      }
    })
  }
}
