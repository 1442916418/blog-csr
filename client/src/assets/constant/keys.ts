export const DEFAULT_COLUMN = Object.freeze({
  code: '',
  key: '',
  keyCode: -1,
  value: {
    first: undefined,
    last: undefined
  },
  classNames: 'w-14 invisible '
})

/**
 * 键盘 {@link https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/code#code_values}
 */
export const KEYBOARD_OBJ = Object.freeze({
  top: [
    [
      {
        code: 'Escape',
        key: 'Escape',
        keyCode: 27,
        value: { first: { label: 'Esc', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      }
    ],
    [
      {
        code: 'F1',
        key: 'F1',
        keyCode: 112,
        value: { first: { label: 'F1', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'F2',
        key: 'F2',
        keyCode: 113,
        value: { first: { label: 'F2', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'F3',
        key: 'F3',
        keyCode: 114,
        value: { first: { label: 'F3', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'F4',
        key: 'F4',
        keyCode: 115,
        value: { first: { label: 'F4', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      }
    ],
    [
      {
        code: 'F5',
        key: 'F5',
        keyCode: 116,
        value: { first: { label: 'F5', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'F6',
        key: 'F6',
        keyCode: 117,
        value: { first: { label: 'F6', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'F7',
        key: 'F7',
        keyCode: 118,
        value: { first: { label: 'F7', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'F8',
        key: 'F8',
        keyCode: 119,
        value: { first: { label: 'F8', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      }
    ],
    [
      {
        code: 'F9',
        key: 'F9',
        keyCode: 120,
        value: { first: { label: 'F9', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'F10',
        key: 'F10',
        keyCode: 121,
        value: { first: { label: 'F10', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'F11',
        key: 'F11',
        keyCode: 122,
        value: { first: { label: 'F11', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'F12',
        key: 'F12',
        keyCode: 123,
        value: { first: { label: 'F12', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      }
    ]
  ],
  left: [
    [
      {
        code: 'Backquote',
        key: '`',
        keyCode: 192,
        value: { first: { label: '`', classNames: 'font-bold ' }, last: { label: '~', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center items-center '
      },
      {
        code: 'Digit1',
        key: '1',
        keyCode: 49,
        value: { first: { label: '1', classNames: 'font-bold ' }, last: { label: '!', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center items-center '
      },
      {
        code: 'Digit2',
        key: '2',
        keyCode: 50,
        value: { first: { label: '2', classNames: 'font-bold ' }, last: { label: '@', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center items-center '
      },
      {
        code: 'Digit3',
        key: '3',
        keyCode: 51,
        value: { first: { label: '3', classNames: 'font-bold ' }, last: { label: '#', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center items-center '
      },
      {
        code: 'Digit4',
        key: '4',
        keyCode: 52,
        value: { first: { label: '4', classNames: 'font-bold ' }, last: { label: '$', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center items-center '
      },
      {
        code: 'Digit5',
        key: '5',
        keyCode: 53,
        value: { first: { label: '5', classNames: 'font-bold ' }, last: { label: '%', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center items-center '
      },
      {
        code: 'Digit6',
        key: '6',
        keyCode: 54,
        value: { first: { label: '6', classNames: 'font-bold ' }, last: { label: '^', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center items-center '
      },
      {
        code: 'Digit7',
        key: '7',
        keyCode: 55,
        value: { first: { label: '7', classNames: 'font-bold ' }, last: { label: '&', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center items-center '
      },
      {
        code: 'Digit8',
        key: '8',
        keyCode: 56,
        value: { first: { label: '8', classNames: 'font-bold ' }, last: { label: '*', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center items-center '
      },
      {
        code: 'Digit9',
        key: '9',
        keyCode: 57,
        value: { first: { label: '9', classNames: 'font-bold ' }, last: { label: '(', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center items-center '
      },
      {
        code: 'Digit0',
        key: '0',
        keyCode: 48,
        value: { first: { label: '0', classNames: 'font-bold ' }, last: { label: ')', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center items-center '
      },
      {
        code: 'Minus',
        key: '-',
        keyCode: 189,
        value: { first: { label: '-', classNames: 'font-bold ' }, last: { label: '_', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center items-center '
      },
      {
        code: 'Equal',
        key: '=',
        keyCode: 187,
        value: { first: { label: '=', classNames: 'font-bold ' }, last: { label: '+', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center items-center '
      },
      {
        code: 'Backspace',
        key: 'Backspace',
        keyCode: 8,
        value: {
          first: { label: 'Backspace', classNames: 'font-bold ' },
          last: { label: '←', classNames: 'font-bold ' }
        },
        classNames: 'w-36 justify-center items-center '
      }
    ],
    [
      {
        code: 'Tab',
        key: 'Tab',
        keyCode: 9,
        value: { first: { label: 'Tab', classNames: 'text-sm ' } },
        classNames: 'w-20 justify-center '
      },
      {
        code: 'KeyQ',
        key: 'Q',
        keyCode: 81,
        value: { first: { label: 'Q', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'KeyW',
        key: 'W',
        keyCode: 87,
        value: { first: { label: 'W', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'KeyE',
        key: 'E',
        keyCode: 69,
        value: { first: { label: 'E', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'KeyR',
        key: 'R',
        keyCode: 82,
        value: { first: { label: 'R', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'KeyT',
        key: 'T',
        keyCode: 84,
        value: { first: { label: 'T', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'KeyY',
        key: 'Y',
        keyCode: 89,
        value: { first: { label: 'Y', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'KeyU',
        key: 'U',
        keyCode: 85,
        value: { first: { label: 'U', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'KeyI',
        key: 'I',
        keyCode: 73,
        value: { first: { label: 'I', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'KeyO',
        key: 'O',
        keyCode: 79,
        value: { first: { label: 'O', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'KeyP',
        key: 'P',
        keyCode: 80,
        value: { first: { label: 'P', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'BracketLeft',
        key: '[',
        keyCode: 219,
        value: { first: { label: '[', classNames: 'font-bold ' }, last: { label: '{', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center items-center '
      },
      {
        code: 'BracketRight',
        key: ']',
        keyCode: 221,
        value: { first: { label: ']', classNames: 'font-bold ' }, last: { label: '}', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center items-center '
      },
      {
        code: 'Backslash',
        key: '\\',
        keyCode: 220,
        value: { first: { label: '\\', classNames: 'font-bold ' }, last: { label: '|', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center items-center '
      }
    ],
    [
      {
        code: 'CapsLock',
        key: 'CapsLock',
        keyCode: 20,
        value: { first: { label: 'CapsLock', classNames: 'text-sm ' } },
        classNames: 'w-24 col-span-2 justify-center '
      },
      {
        code: 'KeyA',
        key: 'a',
        keyCode: 65,
        value: { first: { label: 'A', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'KeyS',
        key: 's',
        keyCode: 83,
        value: { first: { label: 'S', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'KeyD',
        key: 'd',
        keyCode: 68,
        value: { first: { label: 'D', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'KeyF',
        key: 'f',
        keyCode: 70,
        value: { first: { label: 'F', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'KeyG',
        key: 'g',
        keyCode: 71,
        value: { first: { label: 'G', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'KeyH',
        key: 'h',
        keyCode: 72,
        value: { first: { label: 'H', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'KeyJ',
        key: 'j',
        keyCode: 74,
        value: { first: { label: 'J', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'KeyK',
        key: 'k',
        keyCode: 75,
        value: { first: { label: 'K', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'KeyL',
        key: 'l',
        keyCode: 76,
        value: { first: { label: 'L', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'Semicolon',
        key: ';',
        keyCode: 186,
        value: { first: { label: ';', classNames: 'font-bold ' }, last: { label: ':', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center items-center '
      },
      {
        code: 'Quote',
        key: "'",
        keyCode: 222,
        value: { first: { label: "'", classNames: 'font-bold ' }, last: { label: '"', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center items-center '
      },
      {
        code: 'Enter',
        key: 'Enter',
        keyCode: 13,
        value: { first: { label: 'Enter', classNames: 'text-sm ' } },
        classNames: 'w-40 justify-center '
      }
    ],
    [
      {
        code: 'ShiftLeft',
        key: 'Shift',
        keyCode: 16,
        value: { first: { label: 'Shift', classNames: 'text-sm ' } },
        classNames: 'w-28 col-span-3 justify-center '
      },
      {
        code: 'KeyZ',
        key: 'z',
        keyCode: 90,
        value: { first: { label: 'Z', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'KeyX',
        key: 'x',
        keyCode: 88,
        value: { first: { label: 'X', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'KeyC',
        key: 'c',
        keyCode: 67,
        value: { first: { label: 'C', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'KeyV',
        key: 'v',
        keyCode: 86,
        value: { first: { label: 'V', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'KeyB',
        key: 'b',
        keyCode: 66,
        value: { first: { label: 'B', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'KeyN',
        key: 'n',
        keyCode: 78,
        value: { first: { label: 'N', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'KeyM',
        key: 'm',
        keyCode: 77,
        value: { first: { label: 'M', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'Comma',
        key: ',',
        keyCode: 188,
        value: { first: { label: ',', classNames: 'font-bold ' }, last: { label: '<', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center items-center '
      },
      {
        code: 'Period',
        key: '.',
        keyCode: 190,
        value: { first: { label: '.', classNames: 'font-bold ' }, last: { label: '>', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center items-center '
      },
      {
        code: 'Slash',
        key: '/',
        keyCode: 191,
        value: { first: { label: '/', classNames: 'font-bold ' }, last: { label: '?', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center items-center '
      },
      {
        code: 'ShiftRight',
        key: 'Shift',
        keyCode: 16,
        value: { first: { label: 'Shift', classNames: 'text-sm ' } },
        classNames: 'w-44 justify-center'
      }
    ],
    [
      {
        code: 'ControlLeft',
        key: 'Control',
        keyCode: 17,
        value: { first: { label: 'Ctrl', classNames: 'text-sm ' } },
        classNames: 'w-20 justify-center '
      },
      {
        code: 'MetaLeft',
        key: 'Meta',
        keyCode: 91,
        value: { first: { label: 'Meta', classNames: 'text-sm ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'AltLeft',
        key: 'Alt',
        keyCode: 18,
        value: { first: { label: 'Alt', classNames: 'text-sm ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'Space',
        key: 'Space',
        keyCode: 32,
        value: { first: { label: 'Space', classNames: 'text-sm ' } },
        classNames: 'w-96 min-w-full col-start-4 col-end-11 justify-center '
      },
      {
        code: 'AltRight',
        key: 'Alt',
        keyCode: 18,
        value: { first: { label: 'Alt', classNames: 'text-sm ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'MetaRight',
        key: 'Meta',
        keyCode: 92,
        value: { first: { label: 'Meta', classNames: 'text-sm ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'ContextMenu',
        key: 'ContextMenu',
        keyCode: 93,
        value: { first: { label: 'Menu', classNames: 'text-sm ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'ControlRight',
        key: 'Control',
        keyCode: 17,
        value: { first: { label: 'Ctrl', classNames: 'text-sm ' } },
        classNames: 'w-14 justify-center '
      }
    ]
  ],
  center: [
    [
      {
        code: 'PRINTSCRN',
        key: 'PRINTSCRN',
        keyCode: -1,
        value: { first: { label: 'PRINTSCRN', classNames: 'text-xs ' } },
        classNames: 'w-14 text-center '
      },
      {
        code: 'ScrollLock',
        key: 'ScrollLock',
        keyCode: 145,
        value: { first: { label: 'ScrollLock', classNames: 'text-xs ' } },
        classNames: 'w-14 text-center '
      },
      {
        code: 'Pause',
        key: 'Pause',
        keyCode: 19,
        value: { first: { label: 'Pause', classNames: 'text-xs ' } },
        classNames: 'w-14 text-center '
      }
    ],
    [
      {
        code: 'Insert',
        key: 'Insert',
        keyCode: 45,
        value: { first: { label: 'PrintScreen', classNames: 'text-xs ' } },
        classNames: 'w-14 text-center '
      },
      {
        code: 'Home',
        key: 'Home',
        keyCode: 36,
        value: { first: { label: 'Home', classNames: 'text-xs ' } },
        classNames: 'w-14 text-center '
      },
      {
        code: 'PageUp',
        key: 'PageUp',
        keyCode: 33,
        value: { first: { label: 'PageUp', classNames: 'text-xs ' } },
        classNames: 'w-14 text-center '
      }
    ],
    [
      {
        code: 'Delete',
        key: 'Delete',
        keyCode: 46,
        value: { first: { label: 'Delete', classNames: 'text-xs ' } },
        classNames: 'w-14 text-center '
      },
      {
        code: 'End',
        key: 'End',
        keyCode: 35,
        value: { first: { label: 'End', classNames: 'text-xs ' } },
        classNames: 'w-14 text-center '
      },
      {
        code: 'PageDown',
        key: 'PageDown',
        keyCode: 34,
        value: { first: { label: 'PageDown', classNames: 'text-xs ' } },
        classNames: 'w-14 text-center '
      }
    ],
    [],
    [
      {
        code: 'ArrowUp',
        key: 'ArrowUp',
        keyCode: 38,
        value: { first: { label: '&uarr;', classNames: 'font-bold text-xs' } },
        classNames: 'w-14 justify-center col-start-2 col-end-3'
      }
    ],
    [
      {
        code: 'ArrowLeft',
        key: 'ArrowLeft',
        keyCode: 37,
        value: { first: { label: '&larr;', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'ArrowDown',
        key: 'ArrowDown',
        keyCode: 40,
        value: { first: { label: '&darr;', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      },
      {
        code: 'ArrowRight',
        key: 'ArrowRight',
        keyCode: 39,
        value: { first: { label: '&rarr;', classNames: 'font-bold ' } },
        classNames: 'w-14 justify-center '
      }
    ]
  ],
  right: [
    [],
    [
      {
        code: 'NumLock',
        key: 'NumLock',
        keyCode: 144,
        value: { first: { label: 'NumLock', classNames: 'text-xs ' } },
        classNames: 'w-14 text-center '
      },
      {
        code: 'NumpadDivide',
        key: '/',
        keyCode: 111,
        value: { first: { label: '/', classNames: '' } },
        classNames: 'w-14 justify-center text-center '
      },
      {
        code: 'NumpadMultiply',
        key: '*',
        keyCode: 106,
        value: { first: { label: '*', classNames: '' } },
        classNames: 'w-14 justify-center text-center '
      },
      {
        code: 'NumpadSubtract',
        key: '-',
        keyCode: 109,
        value: { first: { label: '-', classNames: '' } },
        classNames: 'w-14 justify-center text-center '
      }
    ],
    [
      {
        code: 'Numpad7',
        key: '7',
        keyCode: 103,
        value: {
          first: { label: '7', classNames: 'font-medium ' },
          last: { label: 'Home', classNames: 'font-normal text-xs ' }
        },
        classNames: 'w-14 justify-center items-center '
      },
      {
        code: 'Numpad8',
        key: '8',
        keyCode: 104,
        value: {
          first: { label: '8', classNames: 'font-medium ' },
          last: { label: '&uarr;', classNames: 'font-normal text-xs ' }
        },
        classNames: 'w-14 justify-center items-center '
      },
      {
        code: 'Numpad9',
        key: '9',
        keyCode: 105,
        value: {
          first: { label: '9', classNames: 'font-medium ' },
          last: { label: 'PgUp', classNames: 'font-normal text-xs ' }
        },
        classNames: 'w-14 justify-center items-center '
      },
      {
        code: 'NumpadAdd',
        key: '+',
        keyCode: 107,
        value: { first: { label: '+', classNames: '' } },
        classNames: 'w-14 h-32 justify-center items-center'
      }
    ],
    [
      {
        code: 'Numpad4',
        key: '4',
        keyCode: 100,
        value: {
          first: { label: '4', classNames: 'font-medium ' },
          last: { label: '&larr;', classNames: 'font-normal text-xs ' }
        },
        classNames: 'w-14 justify-center items-center '
      },
      {
        code: 'Numpad5',
        key: '5',
        keyCode: 101,
        value: { first: { label: '5', classNames: 'font-medium ' } },
        classNames: 'w-14 justify-center items-center '
      },
      {
        code: 'Numpad6',
        key: '6',
        keyCode: 102,
        value: {
          first: { label: '6', classNames: 'font-medium ' },
          last: { label: '&rarr;', classNames: 'font-normal text-xs ' }
        },
        classNames: 'w-14 justify-center items-center '
      },
      DEFAULT_COLUMN
    ],
    [
      {
        code: 'Numpad1',
        key: '1',
        keyCode: 97,
        value: {
          first: { label: '1', classNames: 'font-medium ' },
          last: { label: 'End', classNames: 'font-normal text-xs ' }
        },
        classNames: 'w-14 justify-center items-center '
      },
      {
        code: 'Numpad2',
        key: '2',
        keyCode: 98,
        value: {
          first: { label: '2', classNames: 'font-medium ' },
          last: { label: '&darr;', classNames: 'font-normal text-xs ' }
        },
        classNames: 'w-14 justify-center items-center '
      },
      {
        code: 'Numpad3',
        key: '3',
        keyCode: 99,
        value: {
          first: { label: '3', classNames: 'font-medium ' },
          last: { label: 'PgDn', classNames: 'font-normal text-xs ' }
        },
        classNames: 'w-14 justify-center items-center '
      },
      {
        code: 'NumpadEnter',
        key: 'Enter',
        keyCode: 13,
        value: { first: { label: 'Enter', classNames: '' } },
        classNames: 'w-14 h-32 justify-center items-center '
      }
    ],
    [
      {
        code: 'Numpad0',
        key: '0',
        keyCode: 96,
        value: {
          first: { label: '0', classNames: 'font-medium ' },
          last: { label: 'Ins', classNames: 'font-normal text-xs ' }
        },
        classNames: 'w-28.5 min-w-full col-span-2 justify-center items-center place-self-stretch '
      },
      {
        code: 'NumpadDecimal',
        key: '.',
        keyCode: 110,
        value: {
          first: { label: '.', classNames: '' },
          last: { label: 'Del', classNames: 'font-normal text-xs ' }
        },
        classNames: 'w-14 justify-center items-center '
      },
      DEFAULT_COLUMN,
      DEFAULT_COLUMN
    ]
  ]
})
