import { reactive } from 'vue'
import { useAttachProps, useAttach } from '../attach'

describe('Attach', () => {
  it('shoud set correct props', () => {
    expect((useAttachProps().attach as any).default).toBe(true)
    expect((useAttachProps('body').attach as any).default).toBe('body')
  })

  it('shoud compute correct target', () => {
    const props = reactive<Record<string, any>>({
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
    const props = reactive({
      attach: true,
    })
    const { target } = useAttach(props, 'body')
    expect(target.value).toBe('body')
  })

  it('shoud attach to default target if element not find', () => {
    const el = document.createElement('div')
    el.setAttribute('id', 'custom-attach')
    document.body.appendChild(el)

    const props = reactive({
      attach: '#not-valid',
    })
    const { target } = useAttach(props)
    expect(target.value).toBe('#app')

    props.attach = '#custom-attach'
    expect(target.value).toBe('#custom-attach')

    document.body.removeChild(el)
  })
})
