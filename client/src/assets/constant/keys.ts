export interface KeysParams {
  /**
   * KeyboardEvent.code
   */
  code: string
  /**
   * KeyboardEvent.code
   */
  key: string
  /**
   * KeyboardEvent.code
   */
  keyCode: number
  /** value */
  value: string[]
  /** tailwindcss 类名 */
  classNames: string
}

/**
 * 键盘 {@link https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/code#code_values}
 */
export const KEYBOARD_OBJ = Object.freeze({
  left: [
    [
      { code: 'Escape', key: 'Escape', keyCode: 27, value: ['Esc', ''], classNames: 'w-14 col-span-2 justify-center ' },
      { code: 'F1', key: 'F1', keyCode: 112, value: ['F1', ''], classNames: 'w-14 justify-center ' },
      { code: 'F2', key: 'F2', keyCode: 113, value: ['F2', ''], classNames: 'w-14 justify-center ' },
      { code: 'F3', key: 'F3', keyCode: 114, value: ['F3', ''], classNames: 'w-14 justify-center ' },
      { code: 'F4', key: 'F4', keyCode: 115, value: ['F4', ''], classNames: 'w-14 justify-center ' },
      { code: 'F5', key: 'F5', keyCode: 116, value: ['F5', ''], classNames: 'w-14 justify-center ' },
      { code: 'F6', key: 'F6', keyCode: 117, value: ['F6', ''], classNames: 'w-14 justify-center ' },
      { code: 'F7', key: 'F7', keyCode: 118, value: ['F7', ''], classNames: 'w-14 justify-center ' },
      { code: 'F8', key: 'F8', keyCode: 119, value: ['F8', ''], classNames: 'w-14 justify-center ' },
      { code: 'F9', key: 'F9', keyCode: 120, value: ['F9', ''], classNames: 'w-14 justify-center ' },
      { code: 'F10', key: 'F10', keyCode: 121, value: ['F10', ''], classNames: 'w-14 justify-center ' },
      { code: 'F11', key: 'F11', keyCode: 122, value: ['F11', ''], classNames: 'w-14 justify-center ' },
      { code: 'F12', key: 'F12', keyCode: 123, value: ['F12', ''], classNames: 'w-14 justify-center ' }
    ],
    [
      {
        code: 'Backquote',
        key: '`',
        keyCode: 192,
        value: ['`', '~'],
        classNames: 'w-14 flex-col justify-between items-center '
      },
      {
        code: 'Digit1',
        key: '1',
        keyCode: 49,
        value: ['1', '!'],
        classNames: 'w-14 flex-col justify-between items-center '
      },
      {
        code: 'Digit2',
        key: '2',
        keyCode: 50,
        value: ['2', '@'],
        classNames: 'w-14 flex-col justify-between items-center '
      },
      {
        code: 'Digit3',
        key: '3',
        keyCode: 51,
        value: ['3', '#'],
        classNames: 'w-14 flex-col justify-between items-center '
      },
      {
        code: 'Digit4',
        key: '4',
        keyCode: 52,
        value: ['4', '$'],
        classNames: 'w-14 flex-col justify-between items-center '
      },
      {
        code: 'Digit5',
        key: '5',
        keyCode: 53,
        value: ['5', '%'],
        classNames: 'w-14 flex-col justify-between items-center '
      },
      {
        code: 'Digit6',
        key: '6',
        keyCode: 54,
        value: ['6', '^'],
        classNames: 'w-14 flex-col justify-between items-center '
      },
      {
        code: 'Digit7',
        key: '7',
        keyCode: 55,
        value: ['7', '&'],
        classNames: 'w-14 flex-col justify-between items-center '
      },
      {
        code: 'Digit8',
        key: '8',
        keyCode: 56,
        value: ['8', '*'],
        classNames: 'w-14 flex-col justify-between items-center '
      },
      {
        code: 'Digit9',
        key: '9',
        keyCode: 57,
        value: ['9', '('],
        classNames: 'w-14 flex-col justify-between items-center '
      },
      {
        code: 'Digit0',
        key: '0',
        keyCode: 48,
        value: ['0', ')'],
        classNames: 'w-14 flex-col justify-between items-center '
      },
      {
        code: 'Minus',
        key: '-',
        keyCode: 189,
        value: ['-', '_'],
        classNames: 'w-14 flex-col justify-between items-center '
      },
      {
        code: 'Equal',
        key: '=',
        keyCode: 187,
        value: ['=', '+'],
        classNames: 'w-14 flex-col justify-between items-center '
      },
      {
        code: 'Backspace',
        key: 'Backspace',
        keyCode: 8,
        value: ['Backspace', '←'],
        classNames: 'w-36 flex-col justify-between items-center '
      }
    ],
    [
      { code: 'Tab', key: 'Tab', keyCode: 9, value: ['Tab', ''], classNames: 'w-20 justify-center ' },
      { code: 'KeyQ', key: 'Q', keyCode: 81, value: ['Q', ''], classNames: 'w-14 justify-center ' },
      { code: 'KeyW', key: 'W', keyCode: 87, value: ['W', ''], classNames: 'w-14 justify-center ' },
      { code: 'KeyE', key: 'E', keyCode: 69, value: ['E', ''], classNames: 'w-14 justify-center ' },
      { code: 'KeyR', key: 'R', keyCode: 82, value: ['R', ''], classNames: 'w-14 justify-center ' },
      { code: 'KeyT', key: 'T', keyCode: 84, value: ['T', ''], classNames: 'w-14 justify-center ' },
      { code: 'KeyY', key: 'Y', keyCode: 89, value: ['Y', ''], classNames: 'w-14 justify-center ' },
      { code: 'KeyU', key: 'U', keyCode: 85, value: ['U', ''], classNames: 'w-14 justify-center ' },
      { code: 'KeyI', key: 'I', keyCode: 73, value: ['I', ''], classNames: 'w-14 justify-center ' },
      { code: 'KeyO', key: 'O', keyCode: 79, value: ['O', ''], classNames: 'w-14 justify-center ' },
      { code: 'KeyP', key: 'P', keyCode: 80, value: ['P', ''], classNames: 'w-14 justify-center ' },
      {
        code: 'BracketLeft',
        key: '[',
        keyCode: 219,
        value: ['[', '{'],
        classNames: 'w-14 flex-col justify-between items-center '
      },
      {
        code: 'BracketRight',
        key: ']',
        keyCode: 221,
        value: [']', '}'],
        classNames: 'w-14 flex-col justify-between items-center '
      },
      {
        code: 'Backslash',
        key: '\\',
        keyCode: 220,
        value: ['\\', '|'],
        classNames: 'w-14 flex-col justify-between items-center '
      }
    ],
    [
      {
        code: 'CapsLock',
        key: 'CapsLock',
        keyCode: 20,
        value: ['CapsLock', ''],
        classNames: 'w-24 col-span-2 justify-center '
      },
      { code: 'KeyA', key: 'a', keyCode: 65, value: ['A', ''], classNames: 'w-14 justify-center ' },
      { code: 'KeyS', key: 's', keyCode: 83, value: ['S', ''], classNames: 'w-14 justify-center ' },
      { code: 'KeyD', key: 'd', keyCode: 68, value: ['D', ''], classNames: 'w-14 justify-center ' },
      { code: 'KeyF', key: 'f', keyCode: 70, value: ['F', ''], classNames: 'w-14 justify-center ' },
      { code: 'KeyG', key: 'g', keyCode: 71, value: ['G', ''], classNames: 'w-14 justify-center ' },
      { code: 'KeyH', key: 'h', keyCode: 72, value: ['H', ''], classNames: 'w-14 justify-center ' },
      { code: 'KeyJ', key: 'j', keyCode: 74, value: ['J', ''], classNames: 'w-14 justify-center ' },
      { code: 'KeyK', key: 'k', keyCode: 75, value: ['K', ''], classNames: 'w-14 justify-center ' },
      { code: 'KeyL', key: 'l', keyCode: 76, value: ['L', ''], classNames: 'w-14 justify-center ' },
      {
        code: 'Semicolon',
        key: ';',
        keyCode: 186,
        value: [';', ':'],
        classNames: 'w-14 flex-col justify-between items-center '
      },
      {
        code: 'Quote',
        key: "'",
        keyCode: 222,
        value: ["'", '"'],
        classNames: 'w-14 flex-col justify-between items-center '
      },
      {
        code: 'Enter',
        key: 'Enter',
        keyCode: 13,
        value: ['Enter', ''],
        classNames: 'w-40 flex-col justify-between items-center '
      }
    ],
    [
      {
        code: 'ShiftLeft',
        key: 'Shift',
        keyCode: 16,
        value: ['Shift', ''],
        classNames: 'w-28 col-span-3 justify-center '
      },
      { code: 'KeyZ', key: 'z', keyCode: 90, value: ['Z', ''], classNames: 'w-14 justify-center ' },
      { code: 'KeyX', key: 'x', keyCode: 88, value: ['X', ''], classNames: 'w-14 justify-center ' },
      { code: 'KeyC', key: 'c', keyCode: 67, value: ['C', ''], classNames: 'w-14 justify-center ' },
      { code: 'KeyV', key: 'v', keyCode: 86, value: ['V', ''], classNames: 'w-14 justify-center ' },
      { code: 'KeyB', key: 'b', keyCode: 66, value: ['B', ''], classNames: 'w-14 justify-center ' },
      { code: 'KeyN', key: 'n', keyCode: 78, value: ['N', ''], classNames: 'w-14 justify-center ' },
      { code: 'KeyM', key: 'm', keyCode: 77, value: ['M', ''], classNames: 'w-14 justify-center ' },
      {
        code: 'Comma',
        key: ',',
        keyCode: 188,
        value: [',', '<'],
        classNames: 'w-14 flex-col justify-between items-center '
      },
      {
        code: 'Period',
        key: '.',
        keyCode: 190,
        value: ['.', '>'],
        classNames: 'w-14 flex-col justify-between items-center '
      },
      {
        code: 'Slash',
        key: '/',
        keyCode: 191,
        value: ['/', '?'],
        classNames: 'w-14 flex-col justify-between items-center '
      },
      { code: 'ShiftRight', key: 'Shift', keyCode: 16, value: ['Shift', ''], classNames: 'w-44 justify-center' }
    ],
    [
      { code: 'ControlLeft', key: 'Control', keyCode: 17, value: ['Ctrl', ''], classNames: 'w-20 justify-center ' },
      {
        code: 'MetaLeft',
        key: 'Meta',
        keyCode: 91,
        value: ['Meta', ''],
        classNames: 'w-14 justify-center items-center '
      },
      { code: 'AltLeft', key: 'Alt', keyCode: 18, value: ['Alt', ''], classNames: 'w-14 justify-center items-center ' },
      {
        code: 'Space',
        key: 'Space',
        keyCode: 32,
        value: ['Space', ''],
        classNames: 'w-96 col-span-7 justify-center items-center '
      },
      {
        code: 'AltRight',
        key: 'Alt',
        keyCode: 18,
        value: ['Alt', ''],
        classNames: 'w-14 justify-center items-center '
      },
      {
        code: 'MetaRight',
        key: 'Meta',
        keyCode: 92,
        value: ['Meta', ''],
        classNames: 'w-14 justify-center items-center '
      },
      {
        code: 'ContextMenu',
        key: 'ContextMenu',
        keyCode: 93,
        value: ['Menu', ''],
        classNames: 'w-14 justify-center items-center '
      },
      {
        code: 'ControlRight',
        key: 'Control',
        keyCode: 17,
        value: ['Ctrl', ''],
        classNames: 'w-14 justify-center items-center '
      }
    ]
  ],
  center: [
    [
      { code: 'PRINTSCRN', key: 'PRINTSCRN', keyCode: -1, value: ['PRINTSCRN', ''], classNames: 'w-14 text-center ' },
      {
        code: 'ScrollLock',
        key: 'ScrollLock',
        keyCode: 145,
        value: ['ScrollLock', ''],
        classNames: 'w-14 text-center '
      },
      { code: 'Pause', key: 'Pause', keyCode: 19, value: ['Pause', ''], classNames: 'w-14 text-center ' }
    ],
    [
      { code: 'Insert', key: 'Insert', keyCode: 45, value: ['PrintScreen', ''], classNames: 'w-14 text-center ' },
      { code: 'Home', key: 'Home', keyCode: 36, value: ['Home', ''], classNames: 'w-14 text-center ' },
      { code: 'PageUp', key: 'PageUp', keyCode: 33, value: ['PageUp', ''], classNames: 'w-14 text-center ' }
    ],
    [
      { code: 'Delete', key: 'Delete', keyCode: 46, value: ['Delete', ''], classNames: 'w-14 text-center ' },
      { code: 'End', key: 'End', keyCode: 35, value: ['End', ''], classNames: 'w-14 text-center ' },
      { code: 'PageDown', key: 'PageDown', keyCode: 34, value: ['PageDown', ''], classNames: 'w-14 text-center ' }
    ],
    [],
    [{ code: 'ArrowUp', key: 'ArrowUp', keyCode: 38, value: ['&uarr;', ''], classNames: 'w-14 justify-center ' }],
    [
      { code: 'ArrowLeft', key: 'ArrowLeft', keyCode: 37, value: ['&larr;', ''], classNames: 'w-14 justify-center ' },
      { code: 'ArrowDown', key: 'ArrowDown', keyCode: 40, value: ['&darr;', ''], classNames: 'w-14 justify-center ' },
      { code: 'ArrowRight', key: 'ArrowRight', keyCode: 39, value: ['&rarr;', ''], classNames: 'w-14 justify-center ' }
    ]
  ],
  right: [
    [],
    [
      { code: 'NumLock', key: 'NumLock', keyCode: 144, value: ['NumLock', ''], classNames: 'w-14 text-center ' },
      { code: 'NumpadDivide', key: '/', keyCode: 111, value: ['/', ''], classNames: 'w-14 text-center ' },
      { code: 'NumpadMultiply', key: '*', keyCode: 106, value: ['*', ''], classNames: 'w-14 text-center ' },
      { code: 'NumpadSubtract', key: '-', keyCode: 109, value: ['-', ''], classNames: 'w-14 text-center ' }
    ],
    [
      {
        code: 'Numpad7',
        key: '7',
        keyCode: 103,
        value: ['7', 'Home'],
        classNames: 'w-14 flex-col justify-between items-center '
      },
      {
        code: 'Numpad8',
        key: '8',
        keyCode: 104,
        value: ['8', '&uarr;'],
        classNames: 'w-14 flex-col justify-between items-center '
      },
      {
        code: 'Numpad9',
        key: '9',
        keyCode: 105,
        value: ['9', 'PgUp'],
        classNames: 'w-14 flex-col justify-between items-center '
      },
      {
        code: 'NumpadAdd',
        key: '+',
        keyCode: 107,
        value: ['+', ''],
        classNames: 'w-14 row-span-3 justify-center items-center '
      }
    ],
    [
      {
        code: 'Numpad4',
        key: '4',
        keyCode: 100,
        value: ['4', '&larr;'],
        classNames: 'w-14 flex-col justify-between items-center '
      },
      {
        code: 'Numpad5',
        key: '5',
        keyCode: 101,
        value: ['5', ''],
        classNames: 'w-14 flex-col justify-between items-center '
      },
      {
        code: 'Numpad6',
        key: '6',
        keyCode: 102,
        value: ['6', '&rarr;'],
        classNames: 'w-14 flex-col justify-between items-center '
      }
    ],
    [
      {
        code: 'Numpad1',
        key: '1',
        keyCode: 97,
        value: ['1', 'End'],
        classNames: 'w-14 flex-col justify-between items-center '
      },
      {
        code: 'Numpad2',
        key: '2',
        keyCode: 98,
        value: ['2', '&darr;'],
        classNames: 'w-14 flex-col justify-between items-center '
      },
      {
        code: 'Numpad3',
        key: '3',
        keyCode: 99,
        value: ['3', 'PgDn'],
        classNames: 'w-14 flex-col justify-between items-center '
      },
      {
        code: 'NumpadEnter',
        key: 'Enter',
        keyCode: 13,
        value: ['Enter', ''],
        classNames: 'w-14 justify-center items-center '
      }
    ],
    [
      {
        code: 'Numpad0',
        key: '0',
        keyCode: 96,
        value: ['0', 'Ins'],
        classNames: 'w-14 col-span-2 flex-col justify-between items-center '
      },
      {
        code: 'NumpadDecimal',
        key: '.',
        keyCode: 110,
        value: ['.', 'Del'],
        classNames: 'w-14 flex-col justify-between items-center '
      }
    ]
  ]
})
