import { reactive } from 'vue'

import { dimensions } from '../dimensions'

describe('dimensions', () => {
  it('should take a single prop to use', () => {
    const { useDimensions } = dimensions('width')

    const props = { width: 100 }
    const { dimensionsStyles } = useDimensions(props)

    expect(dimensionsStyles.value.width).toBeDefined()
  })

  it('should take a multiple props to use', () => {
    const { useDimensions } = dimensions('width', 'height')

    const props = { width: 100, height: 200 }
    const { dimensionsStyles } = useDimensions(props)

    expect(dimensionsStyles.value.width).toBeDefined()
    expect(dimensionsStyles.value.height).toBeDefined()
  })

  it('should default to all props when given no props', () => {
    const { useDimensions } = dimensions()

    const props = { width: 100, height: 200, maxWidth: 300, maxHeight: 400, minWidth: 500, minHeight: 600 }
    const { dimensionsStyles } = useDimensions(props)

    expect(dimensionsStyles.value.width).toBeDefined()
    expect(dimensionsStyles.value.height).toBeDefined()
    expect(dimensionsStyles.value.maxWidth).toBeDefined()
    expect(dimensionsStyles.value.maxHeight).toBeDefined()
    expect(dimensionsStyles.value.minWidth).toBeDefined()
    expect(dimensionsStyles.value.minHeight).toBeDefined()
  })
})

describe('useDimensions', () => {
  it.each([
    [{ width: 100 }, { width: '100px' }],
    [{ width: 100, height: '' }, { width: '100px' }],
    [{ width: 100, height: null }, { width: '100px' }],
    [{ width: 100, height: '200' }, { width: '100px', height: '200px' }],
  ])('should have proper styles', (input, expected) => {
    const { useDimensions } = dimensions()

    expect(useDimensions(input).dimensionsStyles.value).toEqual(expected)
  })

  it('should be reactive', () => {
    const { useDimensions } = dimensions()
    const props: { width?: number | string, height?: number | string } = reactive({ width: 100 })
    const { dimensionsStyles } = useDimensions(props)

    expect(dimensionsStyles.value).toEqual({
      width: '100px',
    })

    props.width = 200

    expect(dimensionsStyles.value).toEqual({
      width: '200px',
    })

    delete props.width

    expect(dimensionsStyles.value).toEqual({})

    props.height = 300

    expect(dimensionsStyles.value).toEqual({
      height: '300px',
    })
  })
})

describe('useDimensionsProps', () => {
  it('should have correct structure', () => {
    expect(dimensions('width').useDimensionsProps()).toEqual({
      width: {
        type: [Number, String],
      },
    })

    expect(dimensions('width', 'minWidth').useDimensionsProps()).toEqual({
      width: {
        type: [Number, String],
      },
      minWidth: {
        type: [Number, String],
      },
    })

    expect(dimensions().useDimensionsProps()).toEqual({
      height: {
        type: [Number, String],
      },
      width: {
        type: [Number, String],
      },
      maxHeight: {
        type: [Number, String],
      },
      maxWidth: {
        type: [Number, String],
      },
      minWidth: {
        type: [Number, String],
      },
      minHeight: {
        type: [Number, String],
      },
    })
  })

  it('should allow setting default values', () => {
    expect(dimensions('width').useDimensionsProps({ width: 100 })).toEqual({
      width: {
        type: [Number, String],
        default: 100,
      },
    })

    expect(dimensions('width').useDimensionsProps({ width: '200' })).toEqual({
      width: {
        type: [Number, String],
        default: '200',
      },
    })
  })
})
