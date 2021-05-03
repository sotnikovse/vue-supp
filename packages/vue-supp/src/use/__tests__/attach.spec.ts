import { reactive } from 'vue'
import { useAttachProps, useAttach, AttachProps } from '../attach'

describe('Attach', () => {
  it('shoud set correct props', () => {
    expect(useAttachProps().attach.default).toBe(true)
    expect(useAttachProps('body').attach.default).toBe('body')
  })

  it('shoud compute correct target', () => {
    const props = reactive<AttachProps>({
      attach: true,
    })
    const { target } = useAttach(props)
    expect(target.value).toBe('#app')

    props.attach = false
    expect(target.value).toBe(null)

    props.attach = 'body'
    expect(target.value).toBe('body')

    props.attach = ''
    expect(target.value).toBe('#app')
  })

  it('shoud use default target', () => {
    const props = reactive<AttachProps>({
      attach: true,
    })
    const { target } = useAttach(props, 'body')
    expect(target.value).toBe('body')
  })

  it('shoud attach to default target if element not find', () => {
    const el = document.createElement('div')
    el.setAttribute('id', 'custom-attach')
    document.body.appendChild(el)

    const props = reactive<AttachProps>({
      attach: '#not-valid',
    })
    const { target } = useAttach(props)
    expect(target.value).toBe('#app')

    props.attach = '#custom-attach'
    expect(target.value).toBe('#custom-attach')

    document.body.removeChild(el)
  })
})
