import { Slots } from 'vue'

export type Dictionary<T> = Record<string, T>

export type ObjectItemKey =
  | string
  | (string | number)[]
  | ((item: Dictionary<any>, fallback?: any) => any)

export type Data = Record<string, unknown>

export type EmitFn = (event: string, ...args: unknown[]) => void

export type MaybeRef<T> = T | Ref<T> | ComputedRef<T>
