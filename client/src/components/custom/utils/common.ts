export const prefix = 'y'

export const themeType = ['default', 'primary', 'success', 'warning', 'danger', 'info']

export const themeSize = ['large', 'default', 'small']

type TDataType =
  | 'Number'
  | 'String'
  | 'Boolean'
  | 'Array'
  | 'Object'
  | 'Function'
  | 'Undefined'
  | 'Null'
  | 'Date'
  | 'RegExp'
  | 'Error'

export const getType = (value: any) => Object.prototype.toString.call(value).slice(8, -1) as TDataType
