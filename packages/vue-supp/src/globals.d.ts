declare global {
  interface Element {
    _clickOutside?: EventListenerOrEventListenerObject
    _onScroll?: {
      handler: EventListenerOrEventListenerObject
      options: AddEventListenerOptions
      target?: EventTarget
    }
  }

  function parseInt(s: string | number, radix?: number): number
  function parseFloat(string: string | number): number
}
