export default [
  {
    id: 'k1',
    title: '["1", "2", "3"].map(parseInt) 的返回值是什么？',
    describe: '',
    answerOptions: [
      {
        label: '["1", "2", "3"]',
        value: 'A'
      },
      {
        label: '[1, NaN, NaN]',
        value: 'B'
      },
      {
        label: '[1, 2, 3]',
        value: 'C'
      },
      {
        label: '[0, 1, 2]',
        value: 'D'
      }
    ],
    answer: 'B'
  },
  {
    id: 'k2',
    title: 'JavaScript 中 window 对象的子对象不包含以下哪个对象?',
    describe: '',
    answerOptions: [
      { label: 'self', value: 'A' },
      { label: 'history', value: 'B' },
      { label: 'message', value: 'C' },
      { label: 'document', value: 'D' }
    ],
    answer: 'C'
  },
  {
    id: 'k3',
    title: '[typeof null, null instanceof Object] 这些类型的结果是',
    describe: '',
    answerOptions: [
      { label: 'other', value: 'A' },
      { label: '["object", false]', value: 'B' },
      { label: '[null, false]', value: 'C' },
      { label: '["object", true]', value: 'D' }
    ],
    answer: 'B'
  },
  {
    id: 'k4',
    title: 'var arr = []; typeof arr 的结果是:',
    describe: '',
    answerOptions: [
      { label: 'function', value: 'A' },
      { label: 'array', value: 'B' },
      { label: 'undefined', value: 'C' },
      { label: 'object', value: 'D' }
    ],
    answer: 'D'
  },
  {
    id: 'k5',
    title: '下列不属于 JavaScript 内置对象的是？',
    describe: '',
    answerOptions: [
      { label: 'RegExp', value: 'A' },
      { label: 'Date', value: 'B' },
      { label: 'Error', value: 'C' },
      { label: 'Window', value: 'D' }
    ],
    answer: 'C'
  }
]
