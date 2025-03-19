declare type ConsoleOptions = {
  prefix: string
  color?: {
    line?: string
    background?: string
  }
}

declare class Console {
  readonly #private
  constructor(options: ConsoleOptions)
  log(...arguments_: any[]): void
  info(...arguments_: any[]): void
  warn(...arguments_: any[]): void
  error(...arguments_: any[]): void
}

export default Console
