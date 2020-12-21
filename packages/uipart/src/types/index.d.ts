export type Dictionary<T> = Record<string, T>

export type SelectItemKey = string | (string | number)[] | ((item: Dictionary<any>, fallback?: any) => any)

export type SetupProps = Record<string, any>
