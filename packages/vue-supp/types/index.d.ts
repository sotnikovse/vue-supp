export type Data = Record<string, unknown>

export type MaybeRef<T> = T | Ref<T> | ComputedRef<T>
