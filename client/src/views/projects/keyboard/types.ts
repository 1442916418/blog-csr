export interface KeysParams {
  /**
   * KeyboardEvent.code
   */
  code: string
  /**
   * KeyboardEvent.code
   */
  key: string
  /**
   * KeyboardEvent.code
   */
  keyCode: number
  /** value */
  value: {
    first?: keysValueParams
    last?: keysValueParams
  }
  /** tailwindcss 类名 */
  classNames: string
}

export interface keysValueParams {
  label: string
  classNames: string
}
