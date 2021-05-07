import { mount } from '@vue/test-utils'
import { h, defineComponent } from 'vue'
import { useActivatorProps, useActivator } from '../activator'

describe('activator.ts', () => {
  const component = defineComponent({
    props: {
      ...useActivatorProps(),
      attrs: {
        type: Object,
        default: () => ({}),
      },
      listeners: {
        type: Object,
        default: () => ({}),
      },
    },

    setup(props, ctx) {
      const instance = useActivator(props, ctx)

      if (props.attrs) instance.setActivatorAttrs(props.attrs)
      if (props.listeners) instance.setActivatorListeners(props.listeners)

      return {
        ...instance,
      }
    },

    render() {
      return this.genActivator()
    },
  })

  function mountFunction(options = {}) {
    return mount(component, {
      ...options,
    })
  }

  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
  })

  it('should render activator with slot and match snapshot', () => {
    const wrapper = mountFunction({
      slots: {
        activator: () => h('button', 'Activator'),
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render correct attrs/listeners and match snapshot', () => {
    const wrapper = mountFunction({
      props: {
        attrs: {
          custom: 'custom-attr',
        },
        listeners: {
          onKeypress: () => undefined,
        },
      },
      slots: {
        activator: () => h('button', 'Activator'),
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.vm.genActivatorListeners()).toHaveProperty('onKeypress')
  })

  it('should add custom attrs/listeners from gen function', () => {
    const wrapper = mountFunction({
      props: {
        attrs: {
          custom: 'custom-attr',
        },
        listeners: {
          onKeypress: () => undefined,
        },
      },
      slots: {
        activator: () => h('button', 'Activator'),
      },
    })

    const attrs = wrapper.vm.genActivatorAttributes({
      more: 'more-attr',
    })
    const listeners = wrapper.vm.genActivatorListeners({
      onKeyup: () => undefined,
    })
    expect(attrs).toHaveProperty('more')
    expect(listeners).toHaveProperty('onKeyup')
  })

  it('should pass correct data to v-slot, { attrs, listeners }', () => {
    const wrapper = mountFunction({
      slots: {
        activator: ({ attrs, listeners }: any) =>
          h(
            'button',
            [JSON.stringify(attrs), Object.keys(listeners)].join(',')
          ),
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it.todo(
    'should auto merge attrs and listeners when activator slot is not nested and match snapshot'
  )

  it('should set correct activator element from prop', async () => {
    const wrapperComponent = defineComponent({
      props: useActivatorProps(),
      setup(props) {
        return () =>
          h('div', [
            h('button', { id: 'activator' }, 'Activator'),
            h(component, props),
          ])
      },
    })

    const wrapper = mount(wrapperComponent, {
      attachTo: '#app',
      props: { activator: '#activator' },
    })

    const comp = wrapper.findComponent(component)
    await wrapper.get('#activator').trigger('focus')
    expect(comp.vm.isActive).toBe(true)
  })

  it('should reset activator prop change', async () => {
    const wrapperComponent = defineComponent({
      props: useActivatorProps(),
      setup(props) {
        return () =>
          h('div', [
            h('button', { id: 'activator-1' }, 'Activator 1'),
            h('button', { id: 'activator-2' }, 'Activator 2'),
            h(component, props),
          ])
      },
    })

    const wrapper = mount(wrapperComponent, {
      attachTo: '#app',
      props: { activator: '#activator-1' },
    })

    const comp = wrapper.findComponent(component)
    await wrapper.setProps({ activator: '#activator-2' })
    await wrapper.get('#activator-2').trigger('focus')
    expect(comp.vm.isActive).toBe(true)
  })

  it('should reset listeners on openOnHover, openOnFocus, openOnClick, disableKeys prop change', async () => {
    const wrapperComponent = defineComponent({
      props: useActivatorProps(),
      setup(props) {
        return () =>
          h('div', [
            h('button', { id: 'activator' }, 'Activator'),
            h(component, props),
          ])
      },
    })

    const wrapper = mount(wrapperComponent, {
      attachTo: '#app',
      props: { activator: '#activator' },
    })

    const comp = wrapper.findComponent(component)
    const activator = wrapper.get('#activator')
    await wrapper.setProps({ openOnHover: false })
    await activator.trigger('mouseenter')
    expect(comp.vm.isActive).toBe(false)

    await activator.trigger('click')
    expect(comp.vm.isActive).toBe(true)
    await activator.trigger('click')
    expect(comp.vm.isActive).toBe(false)

    await wrapper.setProps({ openOnClick: false })
    await activator.trigger('click')
    expect(comp.vm.isActive).toBe(false)

    await wrapper.setProps({ openOnFocus: false })
    await activator.trigger('focus')
    expect(comp.vm.isActive).toBe(false)

    comp.vm.isActive = true
    await activator.trigger('keydown', { key: 'Esc' })
    expect(comp.vm.isActive).toBe(false)
    await wrapper.setProps({ disableKeys: true })
    comp.vm.isActive = true
    await activator.trigger('keydown', { key: 'Esc' })
    expect(comp.vm.isActive).toBe(true)
  })

  it('should immediate render on modelValue prop is active', () => {
    const wrapper = mountFunction({
      props: {
        modelValue: true,
      },
    })

    expect(wrapper.vm.isActive).toBe(true)
  })

  it('should deactivate on disable prop change', async () => {
    const wrapper = mountFunction({
      props: {
        modelValue: true,
      },
    })

    expect(wrapper.vm.isActive).toBe(true)
    await wrapper.setProps({ modelValue: true, disabled: true })
    expect(wrapper.vm.isActive).toBe(false)
  })

  it('should toggle isActive and emit update:modelValue', async () => {
    const wrapper = mountFunction()

    await wrapper.setProps({ modelValue: true })
    expect(wrapper.emitted()['update:modelValue'].length).toBe(1)
  })

  it('should focus first element with role="button" or aria-haspopup="true"', () => {
    const wrapper = mountFunction({
      slots: {
        activator: () => [
          h('button', { id: 'btn-1' }, 'Button 1'),
          h('button', { id: 'btn-2' }, 'Button 2'),
        ],
      },
      attachTo: '#app',
    })

    const btn1 = wrapper.get('#btn-1')
    expect(document.activeElement).not.toEqual(btn1.element)
    wrapper.vm.focusActivator()
    expect(document.activeElement).toEqual(btn1.element)
  })
})
