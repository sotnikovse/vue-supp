const optionsModifierRE = /(?:Once|Passive|Capture)$/

/**
 * Parse event name to type and modifiers.
 *
 * @param name - The value to parse.
 * @returns Returns an array that contains type and modifiers.
 */
export const parseEventName = (
  name: string
): [string, AddEventListenerOptions | undefined] => {
  let options: AddEventListenerOptions | undefined
  if (optionsModifierRE.test(name)) {
    options = {}
    let m
    while ((m = name.match(optionsModifierRE))) {
      name = name.slice(0, name.length - m[0].length)
      ;(options as any)[m[0].toLowerCase()] = true
      options // eslint-disable-line no-unused-expressions
    }
  }
  return [name.slice(2).toLowerCase(), options]
}

export default parseEventName
