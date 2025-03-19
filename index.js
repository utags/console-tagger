/**
 * Custom console class that adds a prefix and color styling to console messages.
 */
export default class Console {
  /**
   * The prefix to be added to each console message.
   */
  #prefix
  /**
   * The color code for styling the prefix in the console.
   */
  #colorCode
  /**
   * The global console object.
   */
  #console = globalThis.console

  /**
   * Constructs a new Console instance.
   * @param {Object} options - The options for the console instance.
   * @param {string} options.prefix - The prefix to be added to each console message.
   * @param {Object} [options.color={}] - The color options for styling the prefix.
   * @param {string} [options.color.line] - The text color for the prefix.
   * @param {string} [options.color.background] - The background color for the prefix.
   */
  constructor({ prefix, color = {} }) {
    // Format the prefix by wrapping it in square brackets
    this.#prefix = `[${prefix}]`
    // Generate the color code based on the provided color options
    this.#colorCode = this.#generateColorCode(color)
  }

  /**
   * Generates the color code for styling the prefix in the console.
   * @param {Object} [options={}] - The color options for styling the prefix.
   * @param {string} [options.line] - The text color for the prefix.
   * @param {string} [options.background] - The background color for the prefix.
   * @returns {string} The generated color code.
   */
  #generateColorCode({ line, background } = {}) {
    // Check if the environment is a browser

    const isBrowser = globalThis.window !== undefined
    console.log(isBrowser, globalThis.window)

    // If not a browser, return an empty string as a fallback
    if (!isBrowser) return ''

    // Array to hold the style declarations
    const styles = []
    // Add text color style if provided
    if (line) styles.push(`color: ${line}`)
    // Add background color style if provided
    if (background) styles.push(`background: ${background}`)

    // Join the style declarations with a semicolon and return
    return styles.join('; ') + ';'
  }

  /**
   * Formats the message to include the prefix and color code.
   * @returns {Array} An array containing the formatted prefix and color code.
   */
  #formatMessage() {
    return ['%c' + this.#prefix, this.#colorCode]
  }

  /**
   * Logs a message to the console with the prefix and color styling.
   * @param {...any} arguments_ - The arguments to be logged.
   */
  log(...arguments_) {
    // Call the global console log method with the formatted message and arguments
    this.#console.log(...this.#formatMessage(), ...arguments_)
  }

  /**
   * Logs an info message to the console with the prefix and color styling.
   * @param {...any} arguments_ - The arguments to be logged.
   */
  info = (...arguments_) =>
    this.#console.info(...this.#formatMessage(), ...arguments_)
  /**
   * Logs a warning message to the console with the prefix and color styling.
   * @param {...any} arguments_ - The arguments to be logged.
   */
  warn = (...arguments_) =>
    this.#console.warn(...this.#formatMessage(), ...arguments_)
  /**
   * Logs an error message to the console with the prefix and color styling.
   * @param {...any} arguments_ - The arguments to be logged.
   */
  error = (...arguments_) =>
    this.#console.error(...this.#formatMessage(), ...arguments_)
}
