import { reactive } from 'vue'

import { makeDimensionProps, useDimension, DimensionProps } from '../dimensions'

describe('dimensions.ts', () => {
  describe('makeDimensionProps', () => {
    it('should allow setting default values', () => {
      expect(makeDimensionProps({ width: 100 }).width).toEqual({
        type: [Number, String],
        default: 100,
      })

      expect(makeDimensionProps({ height: '200px' }).height).toEqual({
        type: [Number, String],
        default: '200px',
      })
    })
  })

  describe('useDimension', () => {
    it.each([
      [{ height: null }, {}],
      [{ width: 100 }, { width: '100px' }],
      [{ width: 100, height: '' }, { width: '100px' }],
      [{ width: 100, height: null }, { width: '100px' }],
      [
        { width: 100, height: '200' },
        { width: '100px', height: '200px' },
      ],
    ])('should have proper styles', (props, expected) => {
      expect(
        useDimension(props as DimensionProps).dimensionStyles.value
      ).toEqual(expected)
    })

    it('should be reactive', () => {
      const props: {
        width?: number | string
        height?: number | string
      } = reactive({ width: 100 })
      const { dimensionStyles } = useDimension(props)

      expect(dimensionStyles.value).toEqual({
        width: '100px',
      })

      props.width = 200

      expect(dimensionStyles.value).toEqual({
        width: '200px',
      })

      delete props.width

      expect(dimensionStyles.value).toEqual({})

      props.height = 300

      expect(dimensionStyles.value).toEqual({
        height: '300px',
      })
    })
  })
})
