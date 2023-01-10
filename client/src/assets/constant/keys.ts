/**
 * 键盘 {@link https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/code#code_values}
 */
export const KEYBOARD_LIST = Object.freeze([
  [
    { code: 'Escape', key: 'Escape', keyCode: 27 },
    { code: 'F1', key: 'F1', keyCode: 112 },
    { code: 'F2', key: 'F2', keyCode: 113 },
    { code: 'F3', key: 'F3', keyCode: 114 },
    { code: 'F4', key: 'F4', keyCode: 115 },
    { code: 'F5', key: 'F5', keyCode: 116 },
    { code: 'F6', key: 'F6', keyCode: 117 },
    { code: 'F7', key: 'F7', keyCode: 118 },
    { code: 'F8', key: 'F8', keyCode: 119 },
    { code: 'F9', key: 'F9', keyCode: 120 },
    { code: 'F10', key: 'F10', keyCode: 121 },
    { code: 'F11', key: 'F11', keyCode: 122 },
    { code: 'F12', key: 'F12', keyCode: 123 }
  ],
  [
    { code: 'Backquote', key: '`', keyCode: 192 },
    { code: 'Digit1', key: '1', keyCode: 49 },
    { code: 'Digit2', key: '2', keyCode: 50 },
    { code: 'Digit3', key: '3', keyCode: 51 },
    { code: 'Digit4', key: '4', keyCode: 52 },
    { code: 'Digit5', key: '5', keyCode: 53 },
    { code: 'Digit6', key: '6', keyCode: 54 },
    { code: 'Digit7', key: '7', keyCode: 55 },
    { code: 'Digit8', key: '8', keyCode: 56 },
    { code: 'Digit9', key: '9', keyCode: 57 },
    { code: 'Digit0', key: '0', keyCode: 48 },
    { code: 'Minus', key: '-', keyCode: 189 },
    { code: 'Equal', key: '=', keyCode: 187 },
    { code: 'Backslash', key: '\\', keyCode: 220 },
    { code: 'Backspace', key: 'Backspace', keyCode: 8 },
    { code: 'ScrollLock', key: 'ScrollLock', keyCode: 145 },
    { code: 'Pause', key: 'Pause', keyCode: 19 },
    { code: 'NumLock', key: 'NumLock', keyCode: 144 },
    { code: 'NumpadDivide', key: '/', keyCode: 111 },
    { code: 'NumpadMultiply', key: '*', keyCode: 106 },
    { code: 'NumpadSubtract', key: '-', keyCode: 109 }
  ],
  [
    { code: 'Tab', key: 'Tab', keyCode: 9 },
    { code: 'KeyQ', key: 'Q', keyCode: 81 },
    { code: 'KeyW', key: 'W', keyCode: 87 },
    { code: 'KeyE', key: 'E', keyCode: 69 },
    { code: 'KeyR', key: 'R', keyCode: 82 },
    { code: 'KeyT', key: 'T', keyCode: 84 },
    { code: 'KeyY', key: 'Y', keyCode: 89 },
    { code: 'KeyU', key: 'U', keyCode: 85 },
    { code: 'KeyI', key: 'I', keyCode: 73 },
    { code: 'KeyO', key: 'O', keyCode: 79 },
    { code: 'KeyP', key: 'P', keyCode: 80 },
    { code: 'BracketLeft', key: '[', keyCode: 219 },
    { code: 'BracketRight', key: ']', keyCode: 221 },
    { code: 'Enter', key: 'Enter', keyCode: 13 },
    { code: 'Insert', key: 'Insert', keyCode: 45 },
    { code: 'Home', key: 'Home', keyCode: 36 },
    { code: 'PageUp', key: 'PageUp', keyCode: 33 },
    { code: 'Numpad7', key: '7', keyCode: 103 },
    { code: 'Numpad8', key: '8', keyCode: 104 },
    { code: 'Numpad9', key: '9', keyCode: 105 },
    { code: 'NumpadAdd', key: '+', keyCode: 107 }
  ],
  [
    { code: 'CapsLock', key: 'CapsLock', keyCode: 20 },
    { code: 'KeyA', key: 'a', keyCode: 65 },
    { code: 'KeyS', key: 's', keyCode: 83 },
    { code: 'KeyD', key: 'd', keyCode: 68 },
    { code: 'KeyF', key: 'f', keyCode: 70 },
    { code: 'KeyG', key: 'g', keyCode: 71 },
    { code: 'KeyH', key: 'h', keyCode: 72 },
    { code: 'KeyJ', key: 'j', keyCode: 74 },
    { code: 'KeyK', key: 'k', keyCode: 75 },
    { code: 'KeyL', key: 'l', keyCode: 76 },
    { code: 'Semicolon', key: ';', keyCode: 186 },
    { code: 'Quote', key: "'", keyCode: 222 },
    { code: 'Delete', key: 'Delete', keyCode: 46 },
    { code: 'End', key: 'End', keyCode: 35 },
    { code: 'PageDown', key: 'PageDown', keyCode: 34 },
    { code: 'Numpad4', key: '4', keyCode: 100 },
    { code: 'Numpad5', key: '5', keyCode: 101 },
    { code: 'Numpad6', key: '6', keyCode: 102 }
  ],
  [
    { code: 'ShiftLeft', key: 'Shift', keyCode: 16 },
    { code: 'KeyZ', key: 'z', keyCode: 90 },
    { code: 'KeyX', key: 'x', keyCode: 88 },
    { code: 'KeyC', key: 'c', keyCode: 67 },
    { code: 'KeyV', key: 'v', keyCode: 86 },
    { code: 'KeyB', key: 'b', keyCode: 66 },
    { code: 'KeyN', key: 'n', keyCode: 78 },
    { code: 'KeyM', key: 'm', keyCode: 77 },
    { code: 'Comma', key: ',', keyCode: 188 },
    { code: 'Period', key: '.', keyCode: 190 },
    { code: 'Slash', key: '/', keyCode: 191 },
    { code: 'ShiftRight', key: 'Shift', keyCode: 16 },
    { code: 'ArrowUp', key: 'ArrowUp', keyCode: 38 },
    { code: 'Numpad1', key: '1', keyCode: 97 },
    { code: 'Numpad2', key: '2', keyCode: 98 },
    { code: 'Numpad3', key: '3', keyCode: 99 },
    { code: 'NumpadEnter', key: 'Enter', keyCode: 13 }
  ],
  [
    { code: 'ControlLeft', key: 'Control', keyCode: 17 },
    { code: 'MetaLeft', key: 'Meta', keyCode: 91 },
    { code: 'AltLeft', key: 'Alt', keyCode: 18 },
    { code: 'Space', key: 'Space', keyCode: 32 },
    { code: 'AltRight', key: 'Alt', keyCode: 18 },
    { code: 'MetaRight', key: 'Meta', keyCode: 92 },
    { code: 'ContextMenu', key: 'ContextMenu', keyCode: 93 },
    { code: 'ControlRight', key: 'Control', keyCode: 17 },
    { code: 'ArrowLeft', key: 'ArrowLeft', keyCode: 37 },
    { code: 'ArrowDown', key: 'ArrowDown', keyCode: 40 },
    { code: 'ArrowRight', key: 'ArrowRight', keyCode: 39 },
    { code: 'Numpad0', key: '0', keyCode: 96 },
    { code: 'NumpadDecimal', key: '.', keyCode: 110 }
  ]
])

export const KEYBOARD_OBJ = Object.freeze({
  left: [
    [
      {
        code: 'Escape',
        key: 'Escape',
        keyCode: 27,
        value: ['', 'Esc'],
        classNames: 'flex justify-center items-center '
      },
      { code: 'F1', key: 'F1', keyCode: 112, value: ['', 'F1'], classNames: 'flex justify-center items-center ' },
      { code: 'F2', key: 'F2', keyCode: 113, value: ['', 'F2'], classNames: 'flex justify-center items-center ' },
      { code: 'F3', key: 'F3', keyCode: 114, value: ['', 'F3'], classNames: 'flex justify-center items-center ' },
      { code: 'F4', key: 'F4', keyCode: 115, value: ['', 'F4'], classNames: 'flex justify-center items-center ' },
      { code: 'F5', key: 'F5', keyCode: 116, value: ['', 'F5'], classNames: 'flex justify-center items-center ' },
      { code: 'F6', key: 'F6', keyCode: 117, value: ['', 'F6'], classNames: 'flex justify-center items-center ' },
      { code: 'F7', key: 'F7', keyCode: 118, value: ['', 'F7'], classNames: 'flex justify-center items-center ' },
      { code: 'F8', key: 'F8', keyCode: 119, value: ['', 'F8'], classNames: 'flex justify-center items-center ' },
      { code: 'F9', key: 'F9', keyCode: 120, value: ['', 'F9'], classNames: 'flex justify-center items-center ' },
      { code: 'F10', key: 'F10', keyCode: 121, value: ['', 'F10'], classNames: 'flex justify-center items-center ' },
      { code: 'F11', key: 'F11', keyCode: 122, value: ['', 'F11'], classNames: 'flex justify-center items-center ' },
      { code: 'F12', key: 'F12', keyCode: 123, value: ['', 'F12'], classNames: 'flex justify-center items-center ' }
    ],
    [
      { code: 'Backquote', key: '`', keyCode: 192, value: ['~', '`'], classNames: 'flex flex-col justify-between ' },
      { code: 'Digit1', key: '1', keyCode: 49, value: ['!', '1'], classNames: 'flex flex-col justify-between ' },
      { code: 'Digit2', key: '2', keyCode: 50, value: ['@', '2'], classNames: 'flex flex-col justify-between ' },
      { code: 'Digit3', key: '3', keyCode: 51, value: ['#', '3'], classNames: 'flex flex-col justify-between ' },
      { code: 'Digit4', key: '4', keyCode: 52, value: ['$', '4'], classNames: 'flex flex-col justify-between ' },
      { code: 'Digit5', key: '5', keyCode: 53, value: ['%', '5'], classNames: 'flex flex-col justify-between ' },
      { code: 'Digit6', key: '6', keyCode: 54, value: ['^', '6'], classNames: 'flex flex-col justify-between ' },
      { code: 'Digit7', key: '7', keyCode: 55, value: ['&', '7'], classNames: 'flex flex-col justify-between ' },
      { code: 'Digit8', key: '8', keyCode: 56, value: ['*', '8'], classNames: 'flex flex-col justify-between ' },
      { code: 'Digit9', key: '9', keyCode: 57, value: ['(', '9'], classNames: 'flex flex-col justify-between ' },
      { code: 'Digit0', key: '0', keyCode: 48, value: [')', '0'], classNames: 'flex flex-col justify-between ' },
      { code: 'Minus', key: '-', keyCode: 189, value: ['_', '-'], classNames: 'flex flex-col justify-between ' },
      { code: 'Equal', key: '=', keyCode: 187, value: ['+', '='], classNames: 'flex flex-col justify-between ' },
      {
        code: 'Backslash',
        key: '\\',
        keyCode: 220,
        value: ['|', '\\'],
        classNames: 'flex flex-col justify-between '
      },
      {
        code: 'Backspace',
        key: 'Backspace',
        keyCode: 8,
        value: ['←', 'Backspace'],
        classNames: 'flex flex-col justify-between '
      }
    ],
    [
      { code: 'Tab', key: 'Tab', keyCode: 9, value: ['', 'Tab'], classNames: 'flex ' },
      { code: 'KeyQ', key: 'Q', keyCode: 81, value: ['', 'Q'], classNames: 'flex ' },
      { code: 'KeyW', key: 'W', keyCode: 87, value: ['', 'W'], classNames: 'flex ' },
      { code: 'KeyE', key: 'E', keyCode: 69, value: ['', 'E'], classNames: 'flex ' },
      { code: 'KeyR', key: 'R', keyCode: 82, value: ['', 'R'], classNames: 'flex ' },
      { code: 'KeyT', key: 'T', keyCode: 84, value: ['', 'T'], classNames: 'flex ' },
      { code: 'KeyY', key: 'Y', keyCode: 89, value: ['', 'Y'], classNames: 'flex ' },
      { code: 'KeyU', key: 'U', keyCode: 85, value: ['', 'U'], classNames: 'flex ' },
      { code: 'KeyI', key: 'I', keyCode: 73, value: ['', 'I'], classNames: 'flex ' },
      { code: 'KeyO', key: 'O', keyCode: 79, value: ['', 'O'], classNames: 'flex ' },
      { code: 'KeyP', key: 'P', keyCode: 80, value: ['', 'P'], classNames: 'flex ' },
      {
        code: 'BracketLeft',
        key: '[',
        keyCode: 219,
        value: ['{', '['],
        classNames: 'flex flex-col justify-between '
      },
      {
        code: 'BracketRight',
        key: ']',
        keyCode: 221,
        value: ['}', ']'],
        classNames: 'flex flex-col justify-between '
      },
      {
        code: 'Enter',
        key: 'Enter',
        keyCode: 13,
        value: ['', 'Enter'],
        classNames: 'flex flex-col justify-between '
      }
    ],
    [
      {
        code: 'CapsLock',
        key: 'CapsLock',
        keyCode: 20,
        value: ['', 'CapsLock'],
        classNames: 'flex justify-start items-center '
      },
      { code: 'KeyA', key: 'a', keyCode: 65, value: ['', 'A'], classNames: 'flex ' },
      { code: 'KeyS', key: 's', keyCode: 83, value: ['', 'S'], classNames: 'flex ' },
      { code: 'KeyD', key: 'd', keyCode: 68, value: ['', 'D'], classNames: 'flex ' },
      { code: 'KeyF', key: 'f', keyCode: 70, value: ['', 'F'], classNames: 'flex ' },
      { code: 'KeyG', key: 'g', keyCode: 71, value: ['', 'G'], classNames: 'flex ' },
      { code: 'KeyH', key: 'h', keyCode: 72, value: ['', 'H'], classNames: 'flex ' },
      { code: 'KeyJ', key: 'j', keyCode: 74, value: ['', 'J'], classNames: 'flex ' },
      { code: 'KeyK', key: 'k', keyCode: 75, value: ['', 'K'], classNames: 'flex ' },
      { code: 'KeyL', key: 'l', keyCode: 76, value: ['', 'L'], classNames: 'flex ' },
      { code: 'Semicolon', key: ';', keyCode: 186, value: [':', ';'], classNames: 'flex flex-col justify-between ' },
      { code: 'Quote', key: "'", keyCode: 222, value: ['"', "'"], classNames: 'flex flex-col justify-between ' }
    ],
    [
      {
        code: 'ShiftLeft',
        key: 'Shift',
        keyCode: 16,
        value: ['', 'Shift'],
        classNames: 'flex justify-start items-center '
      },
      { code: 'KeyZ', key: 'z', keyCode: 90, value: ['', 'Z'], classNames: 'flex ' },
      { code: 'KeyX', key: 'x', keyCode: 88, value: ['', 'X'], classNames: 'flex ' },
      { code: 'KeyC', key: 'c', keyCode: 67, value: ['', 'C'], classNames: 'flex ' },
      { code: 'KeyV', key: 'v', keyCode: 86, value: ['', 'V'], classNames: 'flex ' },
      { code: 'KeyB', key: 'b', keyCode: 66, value: ['', 'B'], classNames: 'flex ' },
      { code: 'KeyN', key: 'n', keyCode: 78, value: ['', 'N'], classNames: 'flex ' },
      { code: 'KeyM', key: 'm', keyCode: 77, value: ['', 'M'], classNames: 'flex ' },
      { code: 'Comma', key: ',', keyCode: 188, value: ['<', ','], classNames: 'flex flex-col justify-between ' },
      { code: 'Period', key: '.', keyCode: 190, value: ['>', '.'], classNames: 'flex flex-col justify-between ' },
      { code: 'Slash', key: '/', keyCode: 191, value: ['?', '/'], classNames: 'flex flex-col justify-between ' },
      {
        code: 'ShiftRight',
        key: 'Shift',
        keyCode: 16,
        value: ['', 'Shift'],
        classNames: 'flex '
      }
    ],
    [
      {
        code: 'ControlLeft',
        key: 'Control',
        keyCode: 17,
        value: ['', 'Ctrl'],
        classNames: 'flex justify-start items-center '
      },
      {
        code: 'MetaLeft',
        key: 'Meta',
        keyCode: 91,
        value: ['', 'Meta'],
        classNames: 'flex justify-center items-center '
      },
      { code: 'AltLeft', key: 'Alt', keyCode: 18, value: ['', 'Alt'], classNames: 'flex justify-center items-center ' },
      {
        code: 'Space',
        key: 'Space',
        keyCode: 32,
        value: ['', 'Space'],
        classNames: 'flex justify-center items-center '
      },
      {
        code: 'AltRight',
        key: 'Alt',
        keyCode: 18,
        value: ['', 'Alt'],
        classNames: 'flex justify-center items-center '
      },
      {
        code: 'MetaRight',
        key: 'Meta',
        keyCode: 92,
        value: ['', 'Meta'],
        classNames: 'flex justify-center items-center '
      },
      {
        code: 'ContextMenu',
        key: 'ContextMenu',
        keyCode: 93,
        value: ['', 'Menu'],
        classNames: 'flex justify-center items-center '
      },
      {
        code: 'ControlRight',
        key: 'Control',
        keyCode: 17,
        value: ['', 'Ctrl'],
        classNames: 'flex justify-center items-center '
      }
    ]
  ],
  /** !!!! */
  center: [
    [
      {
        code: 'Sleep',
        key: 'Sleep',
        keyCode: -1,
        value: ['', 'Sleep'],
        classNames: 'flex justify-center items-center '
      },
      {
        code: 'WakeUp',
        key: 'WakeUp',
        keyCode: -1,
        value: ['', 'WakeUp'],
        classNames: 'flex justify-center items-center '
      },
      {
        code: 'Power',
        key: 'Power',
        keyCode: -1,
        value: ['', 'Power'],
        classNames: 'flex justify-center items-center '
      }
    ],
    [
      {
        code: 'PrintScreen',
        key: 'PrintScreen',
        keyCode: -1,
        value: ['', 'PrintScreen'],
        classNames: 'flex justify-center items-center '
      },
      {
        code: 'ScrollLock',
        key: 'ScrollLock',
        keyCode: 145,
        value: ['', 'ScrollLock'],
        classNames: 'flex justify-center items-center '
      },
      {
        code: 'Pause',
        key: 'Pause',
        keyCode: 19,
        value: ['', 'Pause'],
        classNames: 'flex justify-center items-center '
      }
    ],
    [
      {
        code: 'Insert',
        key: 'Insert',
        keyCode: 45,
        value: ['', 'Insert'],
        classNames: 'flex justify-center items-center '
      },
      { code: 'Home', key: 'Home', keyCode: 36, value: ['', 'Home'], classNames: 'flex justify-center items-center ' },
      {
        code: 'PageUp',
        key: 'PageUp',
        keyCode: 33,
        value: ['', 'PageUp'],
        classNames: 'flex justify-center items-center '
      }
    ],
    [
      {
        code: 'Delete',
        key: 'Delete',
        keyCode: 46,
        value: ['', 'Delete'],
        classNames: 'flex justify-center items-center '
      },
      { code: 'End', key: 'End', keyCode: 35, value: ['', 'End'], classNames: 'flex justify-center items-center ' },
      {
        code: 'PageDown',
        key: 'PageDown',
        keyCode: 34,
        value: ['', 'PageDown'],
        classNames: 'flex justify-center items-center '
      }
    ],
    [
      {
        code: 'ArrowUp',
        key: 'ArrowUp',
        keyCode: 38,
        value: ['', '&uarr;'],
        classNames: 'flex justify-center items-center '
      }
    ],
    [
      {
        code: 'ArrowLeft',
        key: 'ArrowLeft',
        keyCode: 37,
        value: ['', '&larr;'],
        classNames: 'flex justify-center items-center '
      },
      {
        code: 'ArrowDown',
        key: 'ArrowDown',
        keyCode: 40,
        value: ['', '&darr;'],
        classNames: 'flex justify-center items-center '
      },
      {
        code: 'ArrowRight',
        key: 'ArrowRight',
        keyCode: 39,
        value: ['', '&rarr;'],
        classNames: 'flex justify-center items-center '
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
        value: ['', 'NumLock'],
        classNames: 'flex justify-center items-center '
      },
      {
        code: 'NumpadDivide',
        key: '/',
        keyCode: 111,
        value: ['', '/'],
        classNames: 'flex justify-center items-center '
      },
      {
        code: 'NumpadMultiply',
        key: '*',
        keyCode: 106,
        value: ['', '*'],
        classNames: 'flex justify-center items-center '
      },
      {
        code: 'NumpadSubtract',
        key: '-',
        keyCode: 109,
        value: ['', '-'],
        classNames: 'flex justify-center items-center '
      }
    ],
    [
      {
        code: 'Numpad7',
        key: '7',
        keyCode: 103,
        value: ['Home', '7'],
        classNames: 'flex justify-center items-center '
      },
      {
        code: 'Numpad8',
        key: '8',
        keyCode: 104,
        value: ['&uarr;', '8'],
        classNames: 'flex justify-center items-center '
      },
      {
        code: 'Numpad9',
        key: '9',
        keyCode: 105,
        value: ['PgUp', '9'],
        classNames: 'flex justify-center items-center '
      },
      { code: 'NumpadAdd', key: '+', keyCode: 107, value: ['', '+'], classNames: 'flex justify-center items-center ' }
    ],
    [
      {
        code: 'Numpad4',
        key: '4',
        keyCode: 100,
        value: ['&larr;', '4'],
        classNames: 'flex justify-center items-center '
      },
      { code: 'Numpad5', key: '5', keyCode: 101, value: ['', '5'], classNames: 'flex justify-center items-center ' },
      {
        code: 'Numpad6',
        key: '6',
        keyCode: 102,
        value: ['&rarr;', '6'],
        classNames: 'flex justify-center items-center '
      }
    ],
    [
      { code: 'Numpad1', key: '1', keyCode: 97, value: ['End', '1'], classNames: 'flex justify-center items-center ' },
      {
        code: 'Numpad2',
        key: '2',
        keyCode: 98,
        value: ['&darr;', '2'],
        classNames: 'flex justify-center items-center '
      },
      { code: 'Numpad3', key: '3', keyCode: 99, value: ['PgDn', '3'], classNames: 'flex justify-center items-center ' },
      {
        code: 'NumpadEnter',
        key: 'Enter',
        keyCode: 13,
        value: ['', 'Enter'],
        classNames: 'flex justify-center items-center '
      }
    ],
    [
      { code: 'Numpad0', key: '0', keyCode: 96, value: ['Ins', '0'], classNames: 'flex justify-center items-center ' },
      {
        code: 'NumpadDecimal',
        key: '.',
        keyCode: 110,
        value: ['Del', '.'],
        classNames: 'flex justify-center items-center '
      }
    ]
  ]
})
