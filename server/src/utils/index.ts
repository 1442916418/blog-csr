/**
 * @name: 获取随机数
 * @param {Number} startIndex 最低 2，默认 2
 * @param {Number} endIndex 最大 15，默认 15
 * @return {String} 随机数
 */
export const randomNumber = (startIndex = 2, endIndex = 15) =>
  Math.random().toString(16).substring(startIndex, endIndex)
