import { ref, watch, getCurrentInstance, toRef, Ref, warn } from 'vue'

export function useModel<
  Props extends object, // eslint-disable-line @typescript-eslint/ban-types
  Prop extends Extract<keyof Props, string>
>(props: Props, prop: Prop) {
  const vm = getCurrentInstance()

  if (!vm) warn('useModel must be called from inside a setup function')

  const proxy = ref(props[prop]) as Ref<Props[Prop]>

  const propRef = toRef(props, prop)

  watch(propRef, (val) => {
    proxy.value = val
  })
  watch(proxy, (val) => {
    vm?.emit(`update:${prop}`, val)
  })

  return proxy
}
