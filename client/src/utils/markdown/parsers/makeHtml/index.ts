import type { MarkdownOptions } from '@/utils/markdown/types'

import headers from './headers'
import italicsBold from './italics-bold'
import blockQuotes from './block-quotes'

export default (text: string, options: MarkdownOptions) => {
  text = headers(text, options)
  text = italicsBold(text, options)
  text = blockQuotes(text, options)

  return text
}