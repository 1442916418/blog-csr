import type { MarkdownOptions } from '@/utils/markdown/types'

export default (text: string, options: MarkdownOptions) => {
  const headerLevelStart = options.headerLevelStart ?? 1
  const atxStyle = options.requireSpaceBeforeHeadingText
    ? /^(#{1,6})[ \t]+(.+?)[ \t]*#*\n+/gm
    : /^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm

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
