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

  public static init = (props: MessageProps) => {
    this.instances.push(this.createMessage(props))
  }

  public static default = (message: string, duration?: number) => {
    this.instances.push(this.createMessage({ type: 'default', message, duration }))
  }

  public static success = (message: string, duration?: number) => {
    this.instances.push(this.createMessage({ type: 'success', message, duration }))
  }

  public static warning = (message: string, duration?: number) => {
    this.instances.push(this.createMessage({ type: 'warning', message, duration }))
  }

  public static danger = (message: string, duration?: number) => {
    this.instances.push(this.createMessage({ type: 'danger', message, duration }))
  }

  private static createMessage = (props: MessageProps) => {
    this.removeMessage()

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
    const instances = this.instances.map((v) => v.id)

    if (!instances.length || instances.length <= max) return

    instances.forEach((id, i) => {
      if (i < max) {
        const ele = document.querySelector('#' + id)

        if (ele) {
          document.body.removeChild(ele)
          this.instances.shift()
        }
      }
    })
  }
}
