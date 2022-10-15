import CryptoJS from 'crypto-js'

const config = require('../../../../env/index.js')

const key = CryptoJS.enc.Utf8.parse(config.crypto.key)
const iv = CryptoJS.enc.Utf8.parse(config.crypto.iv)

/**
 * aes 加密
 * @param word 字符串或对象
 * @returns 加密后的字符串
 */
export const encrypt = (word: string | object): string => {
  let encrypted: any = ''

  if (typeof word === 'string') {
    const msg = CryptoJS.enc.Utf8.parse(word)

    encrypted = CryptoJS.AES.encrypt(msg, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
  } else if (typeof word === 'object') {
    // 对象格式的转成json字符串
    const data = JSON.stringify(word)
    const msg = CryptoJS.enc.Utf8.parse(data)

    encrypted = CryptoJS.AES.encrypt(msg, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
  }

  return encrypted.ciphertext.toString()
}

/**
 * aes 解密
 * @param word 字符串
 * @returns 解密后的字符串
 */
export const decrypt = (word: string): string => {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(word)
  const text = CryptoJS.enc.Base64.stringify(encryptedHexStr)

  const decrypt = CryptoJS.AES.decrypt(text, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })

  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)

  return decryptedStr.toString()
}
