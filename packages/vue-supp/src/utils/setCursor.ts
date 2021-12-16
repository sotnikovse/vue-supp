/**
 * Set cursor of input.
 *
 * @category Util
 * @param el - The input element.
 * @param position - Set position.
 */
export function setCursor(el: HTMLInputElement, position: number) {
  const setSelectionRange = () => {
    el.setSelectionRange(position, position)
  }
  if (el === document.activeElement) {
    setSelectionRange()
    setTimeout(setSelectionRange, 1) // Android Fix
  }
}
