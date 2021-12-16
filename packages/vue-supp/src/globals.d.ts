declare global {
  interface Element {
    _clickOutside?: EventListenerOrEventListenerObject
  }

  function parseInt(s: string | number, radix?: number): number
  function parseFloat(string: string | number): number
}
