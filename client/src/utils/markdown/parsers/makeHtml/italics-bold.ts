import type { MarkdownOptions } from '@/utils/markdown/types'

/**
 * 转换斜体和加粗
 * @example
 *
 *  1. 加粗与斜体
 *    ***TEXT*** => <strong><em>TEXT</em></strong>
 *
 *  2. 加粗
 *    **TEXT** => <strong>TEXT</strong>
 *
 *  3. 斜体
 *    *TEXT* => <em>TEXT</em>
 *
 */
export default (text: string, options: MarkdownOptions) => {
  text = text.replace(/\*\*\*(\S[\s\S]*?)\*\*\*/g, (wm, m) => (/\S$/.test(m) ? `<strong><em>${m}</em></strong>` : wm))
  text = text.replace(/\*\*(\S[\s\S]*?)\*\*/g, (wm, m) => (/\S$/.test(m) ? `<strong>${m}</strong>` : wm))
  text = text.replace(/\*([^\s*][\s\S]*?)\*/g, (wm, m) => (/\S$/.test(m) ? `<em>${m}</em>` : wm))

  return text
}
