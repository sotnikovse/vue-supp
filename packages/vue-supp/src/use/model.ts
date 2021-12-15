import { ref, watch, toRef, Ref } from 'vue'
import { getCurrentInstance } from '../utils'

export function useModel<
  Props extends object, // eslint-disable-line @typescript-eslint/ban-types
  Prop extends Extract<keyof Props, string>
>(props: Props, prop: Prop) {
  const vm = getCurrentInstance('useModel')

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
