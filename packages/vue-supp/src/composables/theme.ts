import { ref, inject, watchEffect } from 'vue'
import type { InjectionKey, Ref } from 'vue'

export interface ThemeInstance {
  isDark: Ref<boolean>
}

export const ThemeSymbol: InjectionKey<ThemeInstance> = Symbol.for('vs:theme')

export function createTheme() {
  const isDark = ref(true)

  watchEffect(() => {
    if (isDark.value) {
      document.querySelector('html')?.classList.add('dark')
    } else {
      document.querySelector('html')?.classList.remove('dark')
    }
  })

  return { isDark }
}

export function useTheme() {
  const theme = inject(ThemeSymbol)

  if (!theme) throw new Error('Could not find theme injection')

  return theme
}
