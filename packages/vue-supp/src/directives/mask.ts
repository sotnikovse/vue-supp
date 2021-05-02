import { DirectiveBinding } from 'vue'

const tokens = {
  '#': { pattern: /\d/ },
  X: { pattern: /[0-9a-zA-Z]/ },
  S: { pattern: /[a-zA-Z]/ },
  A: { pattern: /[a-zA-Z]/, transform: (v: string) => v.toLocaleUpperCase() },
  a: { pattern: /[a-zA-Z]/, transform: (v: string) => v.toLocaleLowerCase() },
  '!': { escape: true },
}

function masker(
  value: string,
  mask: string,
  masked = true,
  tokens: Record<string, any>
) {
  value = value || ''
  mask = mask || ''
  let iMask = 0
  let iValue = 0
  let output = ''
  while (iMask < mask.length && iValue < value.length) {
    let cMask = mask[iMask]
    const _masker = tokens[cMask]
    const cValue = value[iValue]
    if (_masker && !_masker.escape) {
      if (_masker.pattern.test(cValue)) {
        output += _masker.transform ? _masker.transform(cValue) : cValue
        iMask++
      }
      iValue++
    } else {
      if (_masker && _masker.escape) {
        iMask++ // take the next mask char and treat it as char
        cMask = mask[iMask]
      }
      if (masked) output += cMask
      if (cValue === cMask) iValue++ // user typed the same char
      iMask++
    }
  }

  // fix mask that ends with a char: (#)
  let restOutput = ''
  while (iMask < mask.length && masked) {
    // eslint-disable-line no-unmodified-loop-condition
    const cMask = mask[iMask]
    if (tokens[cMask]) {
      restOutput = ''
      break
    }
    restOutput += cMask
    iMask++
  }

  return output + restOutput
}

// https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events#The_old-fashioned_way
function event(name: string) {
  const evt = document.createEvent('Event')
  evt.initEvent(name, true, true)
  return evt
}

export const Mask = function (el: HTMLInputElement, binding: DirectiveBinding) {
  let config = binding.value
  if (Array.isArray(config) || typeof config === 'string') {
    config = {
      mask: config,
      tokens: tokens,
    }
  }

  if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
    const els = el.getElementsByTagName('input')
    if (els.length !== 1) {
      throw new Error('v-mask directive requires 1 input, found ' + els.length)
    } else {
      el = els[0]
    }
  }

  el.oninput = function (evt: Event | InputEvent) {
    if (!evt.isTrusted) return // avoid infinite loop
    /* other properties to try to diferentiate InputEvent of Event (custom)
    InputEvent (native)
      cancelable: false
      isTrusted: true
      composed: true
      isComposing: false
      which: 0
    Event (custom)
      cancelable: true
      isTrusted: false
    */
    // by default, keep cursor at same position as before the mask
    let position = el.selectionEnd ?? 0
    // save the character just inserted
    const digit = el.value[position - 1]
    el.value = masker(el.value, config.mask, true, config.tokens)
    // if the digit was changed, increment position until find the digit again
    while (
      position < el.value.length &&
      el.value.charAt(position - 1) !== digit
    ) {
      position++
    }
    if (el === document.activeElement) {
      el.setSelectionRange(position, position)
      setTimeout(function () {
        el.setSelectionRange(position, position)
      }, 0)
    }
    el.dispatchEvent(event('input'))
  }

  const newDisplay = masker(el.value, config.mask, true, config.tokens)
  if (newDisplay !== el.value) {
    el.value = newDisplay
    el.dispatchEvent(event('input'))
  }
}

export default Mask
