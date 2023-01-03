export const validateEmail =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const validateGuid = /^[a-f\d]{4}(?:[a-f\d]{4}-){4}[a-f\d]{12}$/i

export const MESSAGES: { [k: number]: string } = {
  400: '请求错误',
  401: '未授权，请重新登录',
  403: '拒绝访问',
  404: '请求出错',
  408: '请求超时',
  500: '服务器错误',
  501: '服务未实现',
  502: '网络错误',
  503: '服务不可用',
  504: '网络超时',
  505: 'HTTP版本不受支持'
}

/**
 * 首页 - 默认 Tab 分类
 */
export const DEFAULT_TAB = Object.freeze({
  /** 0: 我的/我关注的 */
  my: '0',
  /** 1: 全部 */
  all: '1',
  /** 2: 我喜欢的 */
  like: '2'
})

export const PAUSED = 'paused'

export const RUNNING = 'running'

const PROJECT_BASE_URL = 'https://github.com/florinpop17/app-ideas/blob/master/Projects/'

export const PROJECTS = Object.freeze({
  decimalConversion: {
    title: '二进制转十进制',
    url: PROJECT_BASE_URL + '1-Beginner/Bin2Dec-App.md',
    id: '_52939c4b3045c'
  },
  borderRadius: {
    title: '边框预览器',
    url: PROJECT_BASE_URL + '1-Beginner/Border-Radius-Previewer.md',
    id: '_63849aad0b106'
  },
  calculator: {
    title: '计算器',
    url: PROJECT_BASE_URL + '1-Beginner/Calculator-App.md',
    id: '_81b62a1c64ec2'
  },
  christmasLights: {
    title: '圣诞灯饰',
    url: PROJECT_BASE_URL + '1-Beginner/Christmas-Lights-App.md',
    id: '_8108afa0f0c08'
  },
  colorCycle: {
    title: '颜色循环',
    url: PROJECT_BASE_URL + '1-Beginner/Color-Cycle-App',
    id: '_6aa7ed9273534'
  }
})
