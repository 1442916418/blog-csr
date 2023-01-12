export interface MarkdownOptions {
  /** 强制在 # 和标题文本之间添加空格（GFM样式） */
  requireSpaceBeforeHeadingText?: boolean
  /**
   *  标题块级别开始
   * @example
   *
   *   # Header 1
   *   ## Header 2
   *   ## Header 2 with closing hashes ##
   *   ...
   *   ###### Header 6
   */
  headerLevelStart?: number
  /**
   * 使用大括号中的文本作为标头 id
   * @example
   *
   *   ## Sample header {real-id}
   */
  customizedHeaderId?: boolean
}

export interface MarkdownParams {
  options: MarkdownOptions
}
