import makeHtml from './parsers/makeHtml'

import { defaultMarkdownOptions } from './constant'

import type { MarkdownParams } from '@/utils/markdown/types'

const defaultParams = { options: defaultMarkdownOptions }

class Markdown {
  private params: MarkdownParams

  constructor(params: MarkdownParams = defaultParams) {
    this.params = params
  }

  public makeHtml(text: string) {
    if (!text) return text

    // 标准化行尾
    text = text.replace(/\r\n/g, '\n') // DOS to Unix
    text = text.replace(/\r/g, '\n') // Mac to Unix

    // 标准化空格
    text = text.replace(/\u00A0/g, '&nbsp;')

    text = '\n\n' + text + '\n\n'

    /**
     * 删除仅包含空格和制表符的任何行。
     * 这使得后续的正则表达式更容易编写，因为我们可以
     * 用 /\n+/ 而不是某物匹配连续的空白行
     * 如 /[ \t]*\n+/
     */
    text = text.replace(/^[ \t]+$/gm, '')

    text = makeHtml(text, this.params.options)

    return text
  }
}

export default Markdown
