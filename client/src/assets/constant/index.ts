/**
 * 基础路径
 */
const PROJECT_BASE_URL = 'https://github.com/florinpop17/app-ideas/blob/master/Projects/'

/**
 * 初学者
 * @param name Name
 * @returns URL
 */
const Beginner = (name: string) => PROJECT_BASE_URL + '1-Beginner/' + name

/**
 * 初级项目声明
 */
export const PROJECTS = Object.freeze({
  decimalConversion: {
    title: '二进制转十进制',
    url: Beginner('Bin2Dec-App.md'),
    id: '_52939c4b3045c'
  },
  borderRadius: {
    title: '边框预览器',
    url: Beginner('Border-Radius-Previewer.md'),
    id: '_63849aad0b106'
  },
  calculator: {
    title: '计算器',
    url: Beginner('Calculator-App.md'),
    id: '_81b62a1c64ec2'
  },
  christmasLights: {
    title: '圣诞灯饰',
    url: Beginner('Christmas-Lights-App.md'),
    id: '_8108afa0f0c08'
  },
  colorCycle: {
    title: '颜色循环',
    url: Beginner('Color-Cycle-App'),
    id: '_6aa7ed9273534'
  },
  countdownTimer: {
    title: '倒计时',
    url: Beginner('Countdown-Timer-App.md'),
    id: '_00c60664308e9'
  },
  jsonCsv: {
    title: 'JSON-CSV',
    url: Beginner('CSV2JSON-App.md'),
    id: '_03400c1329306'
  },
  dynamicCSSVariables: {
    title: '动态 CSS 变量',
    url: Beginner('Dynamic-CSSVar-app.md'),
    id: '_1947786ccaa55'
  },
  indexedDB: {
    title: 'IndexedDB',
    url: Beginner('First-DB-App.md'),
    id: '_4d3d08f4cdcbf'
  },
  flip: {
    title: '翻转',
    url: Beginner('Flip-Image-App.md'),
    id: '_88124cdf821e'
  },
  keyboard: {
    title: '键盘',
    url: Beginner('Key-Value-App.md'),
    id: '_83190f855269a'
  }
})

const CSS_30_DAY = 'https://github.com/MilenaCarecho/30diasDeCSS'

const _c = (v: string) => CSS_30_DAY + v

export const CSS_PROJECTS = Object.freeze({
  layeredIcon: {
    title: '分层图标',
    url: _c('#id01'),
    id: '_9948fefc42587'
  },
  loading: {
    title: 'Loading',
    url: _c('#id02'),
    id: '_c7498a06216aa'
  }
})
