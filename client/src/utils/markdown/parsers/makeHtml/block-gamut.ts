import type { MarkdownOptions } from '@/utils/markdown/types'

import blockQuotes from './block-quotes'
import headers from './headers'

export default (text: string, options: MarkdownOptions) => {
  text = blockQuotes(text, options)
  text = headers(text, options)

  return text
}
