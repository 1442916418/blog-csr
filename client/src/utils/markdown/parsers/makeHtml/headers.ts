import type { MarkdownOptions } from '@/utils/markdown/types'

/**
 * 转换 header
 * @example
 *
 *   # Header 1 => <h1>Header 1</h1>
 *   ...
 *   # Header 6 => <h6>Header 6</h6>
 */
export default (text: string, options: MarkdownOptions) => {
  const headerLevelStart = options.headerLevelStart ?? 1
  const atxStyle = options.requireSpaceBeforeHeadingText
    ? /^(#{1,6})[ \t]+(.+?)[ \t]*#*\n+/gm
    : /^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm

  // TODO: 中间内容
  text = text.replace(atxStyle, function (wholeMatch, m1, m2) {
    let hText = m2
    if (options.customizedHeaderId) {
      hText = m2.replace(/\s?{([^{]+?)}\s*$/, '')
    }

    const hLevel = headerLevelStart - 1 + m1.length

    return '<h' + hLevel + '>' + hText + '</h' + hLevel + '>'
  })

  return text
}
