/**
 * Set cursor of input.
 *
 * @param el - The input element.
 * @param position - Set position.
 * @returns
 */
export const setCursor = (el: HTMLInputElement, position: number): void => {
  const setSelectionRange = (): void => {
    el.setSelectionRange(position, position)
  }
  if (el === document.activeElement) {
    setSelectionRange()
    setTimeout(setSelectionRange, 1) // Android Fix
  }
}

export default {
  setCursor,
}
