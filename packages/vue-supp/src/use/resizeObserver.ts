import { watch, onUnmounted, unref } from 'vue'
import { MaybeRef } from '../../types'

export interface ResizeObserverSize {
  readonly inlineSize: number
  readonly blockSize: number
}

export interface ResizeObserverEntry {
  readonly target: Element
  readonly contentRect: DOMRectReadOnly
  readonly borderBoxSize?: ReadonlyArray<ResizeObserverSize>
  readonly contentBoxSize?: ReadonlyArray<ResizeObserverSize>
  readonly devicePixelContentBoxSize?: ReadonlyArray<ResizeObserverSize>
}

// eslint-disable-next-line no-use-before-define
export type ResizeObserverCallback = (
  entries: ReadonlyArray<ResizeObserverEntry>,
  observer: ResizeObserver
) => void

export interface ResizeObserverOptions {
  /**
   * Sets which box model the observer will observe changes to. Possible values
   * are `content-box` (the default), and `border-box`.
   *
   * @default 'content-box'
   */
  box?: 'content-box' | 'border-box'
}

declare class ResizeObserver {
  constructor(callback: ResizeObserverCallback)
  disconnect(): void
  observe(target: Element, options?: ResizeObserverOptions): void
  unobserve(target: Element): void
}

/**
 * Reports changes to the dimensions of an Element's content or the border-box
 *
 * @param target
 * @param callback
 * @param options
 */
export function useResizeObserver(
  target: MaybeRef<Element | null | undefined>,
  callback: ResizeObserverCallback,
  options: ResizeObserverOptions = {}
) {
  let observer: ResizeObserver | undefined
  const isSupported = window && 'ResizeObserver' in window

  const cleanup = () => {
    if (observer) {
      observer.disconnect()
      observer = undefined
    }
  }

  const stopWatch = watch(
    () => unref(target),
    (el) => {
      cleanup()

      if (isSupported && window && el) {
        observer = new window.ResizeObserver(callback)
        observer!.observe(el, options) // eslint-disable-line @typescript-eslint/no-non-null-assertion
      }
    },
    { immediate: true, flush: 'post' }
  )

  const stop = () => {
    cleanup()
    stopWatch()
  }

  onUnmounted(stop)

  return {
    isSupported,
    stop,
  }
}
