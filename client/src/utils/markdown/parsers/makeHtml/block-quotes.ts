import type { MarkdownOptions } from '@/utils/markdown/types'

import blockGamut from './block-gamut'

/**
 * 块级引用元素
 *
 * @example
 *
 *   > TEXT
 *   >> TEXT
 *   >>> TEXT
 *
 *   =>
 *
 *   ???
 */
export default (text: string, options: MarkdownOptions) => {
  text = text + '\n\n'

  const rgx = /(^ {0,3}>[ \t]?.+\n(.+\n)*\n*)+/gm

  // TODO:
  text = text.replace(rgx, function (bq) {
    bq = bq.replace(/^[ \t]*>[ \t]?/gm, '')
    bq = bq.replace(/^[ \t]+$/gm, '')
    bq = bq.replace(/(^|\n)/g, '$1  ')

    bq = blockGamut(bq, options)

    bq = bq.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function (wholeMatch, m1) {
      let pre = m1
      pre = pre.replace(/^ {2}/gm, '¨0')
      pre = pre.replace(/¨0/g, '')
      return pre
    })

    return '<blockquote>\n' + bq + '\n</blockquote>'
  })

  return text
}
