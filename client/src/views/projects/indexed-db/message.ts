class Message {
  static list: string[] = []

  static add(value: string, ...values: string[]) {
    this.list.push(value, ...values)
  }

  static get() {
    return this.list
  }

  static clear() {
    this.list.length = 0
  }
}

export default Message
