import { reactive } from 'vue'
import { makeTeleportProps, useTeleport, TeleportProps } from '../teleport'

describe('teleport.ts', () => {
  it('shoud set correct props', () => {
    expect(makeTeleportProps().teleport.default).toBe(true)
    expect(makeTeleportProps({ teleport: '#app' }).teleport.default).toBe(
      '#app'
    )
  })

  it('shoud compute correct target', () => {
    const props = reactive<TeleportProps>({
      teleport: true,
    })
    const { teleportTarget } = useTeleport(props)
    expect(teleportTarget.value).toBeDefined()

    props.teleport = 'body'
    expect(teleportTarget.value).toBeDefined()
  })

  it('shoud attach to default target if element not find', () => {
    const el = document.createElement('div')
    el.setAttribute('id', 'custom-attach')
    document.body.appendChild(el)

    const props = reactive<TeleportProps>({
      teleport: '#custom-attach',
    })
    const { teleportTarget } = useTeleport(props)
    expect(teleportTarget.value).toBe(el)

    document.body.removeChild(el)
  })
})
