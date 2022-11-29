import { h } from 'vue'

interface Props {
  loading: boolean
}

const loading = (props: Props) => {
  return h('i', {
    class: ['iconfont', 'icon-loading', 'g-icon-loading'],
    style: { display: props.loading ? 'inline-block' : 'none' }
  })
}

loading.props = ['loading']

export default loading
