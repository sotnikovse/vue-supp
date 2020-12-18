/**
 * Set cursor of input.
 * @param {HTMLInputElement} el
 * @param {number} position
 * @returns {Event}
 */
export const setCursor = (el: HTMLInputElement, position: number) => {
  const setSelectionRange = () => { el.setSelectionRange(position, position) }
  if (el === document.activeElement) {
    setSelectionRange()
    setTimeout(setSelectionRange, 1) // Android Fix
  }
}
