import headers from './headers'

import type { MarkdownOptions } from '@/utils/markdown/types'

export default function (text: string, options: MarkdownOptions) {
  text = headers(text, options)

  return text
}
