import { prefix } from '@/components/custom/utils/common'

/**
 * BEM
 * @param block 块
 * @param element 元素
 * @param modifier 修饰
 * @returns ClassName
 */
const _bem = (block: string, element?: string, modifier?: string) => {
  let cls = `${prefix}-${block}`
  if (element) {
    cls += `__${element}`
  }
  if (modifier) {
    cls += `--${modifier}`
  }
  return cls
}

/**
 * 块元素类
 * @param block 块元素
 * @returns ClassName
 */
export const b = (block: string) => _bem(block)

/**
 * 块元素类 - 元素
 * @param block 块元素
 * @param element 元素
 * @returns ClassName
 */
export const be = (block: string, element: string) => _bem(block, element)

/**
 * 块元素类 - 修饰
 * @param block 块元素
 * @param modifier 修饰
 * @returns ClassName
 */
export const bm = (block: string, modifier: string) => _bem(block, '', modifier)

/**
 * 是否添加类
 * @param name 名称
 * @param c 源数据
 * @returns ClassName
 */
export const is = (name: string, c: boolean | string | unknown[]) => {
  if (typeof c === 'boolean') {
    return name && c ? 'is-' + name : ''
  }
  if (typeof c === 'string') {
    return name && name === c ? 'is-' + name : ''
  }
  if (c instanceof Array) {
    return name && c.includes(name) ? 'is-' + name : ''
  }
}
