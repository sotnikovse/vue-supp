import type { TouchStoredHandlers } from './directives/touch'

declare global {
  interface Element {
    _clickOutside?: EventListenerOrEventListenerObject
    _onResize?: {
      handler: () => void
      options: AddEventListenerOptions
    }
    _observe?: {
      init: boolean
      observer: IntersectionObserver
    }
    _onScroll?: {
      handler: EventListenerOrEventListenerObject
      options: AddEventListenerOptions
      target?: EventTarget
    }
  }

  function parseInt(s: string | number, radix?: number): number
  function parseFloat(string: string | number): number
}
