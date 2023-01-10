import { onMounted, reactive } from 'vue'

/**
 * 收集键盘数据
 */
export default function () {
  /** Variable */
  let list = reactive<any>([])
  const result = reactive<any>([])

  /** Operation */
  const handleSubmit = () => {
    result.push(list)

    const value = JSON.parse(JSON.stringify(result))

    window.localStorage.setItem('json', JSON.stringify(value))

    list = []
  }

  /** Lifecycle Hooks */
  onMounted(() => {
    window.localStorage.removeItem('json')
    document.addEventListener('keydown', (e) => {
      e.preventDefault()
      list.push({ code: e.code, key: e.key, keyCode: e.keyCode })
    })
  })
}
