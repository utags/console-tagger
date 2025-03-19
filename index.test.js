const Console = require('./index')

describe('Console class', () => {
  let consoleInstance

  beforeEach(() => {
    // 模拟浏览器环境
    globalThis.window = {}
    consoleInstance = new Console({
      prefix: 'TestPrefix',
      color: { line: 'red', background: 'yellow' },
    })
    // 清理模拟环境
    delete globalThis.window
  })

  describe('Constructor', () => {
    test('should initialize prefix and colorCode correctly', () => {
      const consoleLogSpy = jest.spyOn(globalThis.console, 'log')
      consoleInstance.log('test')
      const loggedArguments = consoleLogSpy.mock.calls[0]
      expect(loggedArguments[0]).toBe('%c[TestPrefix]')
      expect(loggedArguments[1]).toBe('color: red; background: yellow;')
      consoleLogSpy.mockRestore()
    })
  })

  describe('#generateColorCode', () => {
    test('should return an empty string in non-browser environment', () => {
      const originalWindow = globalThis.window
      delete globalThis.window
      const newInstance = new Console({
        prefix: 'TestPrefix',
        color: { line: 'red', background: 'yellow' },
      })
      const consoleLogSpy = jest.spyOn(globalThis.console, 'log')
      newInstance.log('test')
      const loggedArguments = consoleLogSpy.mock.calls[0]
      expect(loggedArguments[1]).toBe('')
      globalThis.window = originalWindow
      consoleLogSpy.mockRestore()
    })

    test('should generate correct color code in browser environment', () => {
      const consoleLogSpy = jest.spyOn(globalThis.console, 'log')
      consoleInstance.log('test')
      const loggedArguments = consoleLogSpy.mock.calls[0]
      expect(loggedArguments[1]).toBe('color: red; background: yellow;')
      consoleLogSpy.mockRestore()
    })
  })

  describe('#formatMessage', () => {
    test('should return formatted message with prefix and color code', () => {
      const consoleLogSpy = jest.spyOn(globalThis.console, 'log')
      consoleInstance.log('test')
      const loggedArguments = consoleLogSpy.mock.calls[0]
      expect(loggedArguments[0]).toBe('%c[TestPrefix]')
      expect(loggedArguments[1]).toBe('color: red; background: yellow;')
      consoleLogSpy.mockRestore()
    })
  })

  describe('log method', () => {
    test('should call console.log with formatted message and arguments', () => {
      const consoleLogSpy = jest.spyOn(globalThis.console, 'log')
      consoleInstance.log('test message')
      expect(consoleLogSpy).toHaveBeenCalledWith(
        '%c[TestPrefix]',
        'color: red; background: yellow;',
        'test message'
      )
      consoleLogSpy.mockRestore()
    })
  })

  describe('info method', () => {
    test('should call console.info with formatted message and arguments', () => {
      const consoleInfoSpy = jest.spyOn(globalThis.console, 'info')
      consoleInstance.info('test message')
      expect(consoleInfoSpy).toHaveBeenCalledWith(
        '%c[TestPrefix]',
        'color: red; background: yellow;',
        'test message'
      )
      consoleInfoSpy.mockRestore()
    })
  })

  describe('warn method', () => {
    test('should call console.warn with formatted message and arguments', () => {
      const consoleWarnSpy = jest.spyOn(globalThis.console, 'warn')
      consoleInstance.warn('test message')
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        '%c[TestPrefix]',
        'color: red; background: yellow;',
        'test message'
      )
      consoleWarnSpy.mockRestore()
    })
  })

  describe('error method', () => {
    test('should call console.error with formatted message and arguments', () => {
      const consoleErrorSpy = jest.spyOn(globalThis.console, 'error')
      consoleInstance.error('test message')
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        '%c[TestPrefix]',
        'color: red; background: yellow;',
        'test message'
      )
      consoleErrorSpy.mockRestore()
    })
  })
})
