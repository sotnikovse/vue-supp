import { reactive } from 'vue'
import {
  useAspectRatioProps,
  useAspectRatio,
  AspectRatioProps,
} from '../aspectRatio'

describe('Aspect ratio', () => {
  describe('useAspectRatioProps', () => {
    it('shoud set correct props', () => {
      expect(useAspectRatioProps().aspectRatio).toBeDefined()
    })
  })

  describe('useAspectRatio', () => {
    it('should compute correct style', async () => {
      const props = reactive<AspectRatioProps>({
        aspectRatio: undefined,
      })
      const { aspectStyle } = useAspectRatio(props)

      expect(aspectStyle.value).toBe(undefined)

      props.aspectRatio = 1
      expect(aspectStyle.value?.paddingBottom).toBe('100%')

      const aspectRatio = 16 / 9
      props.aspectRatio = aspectRatio
      expect(aspectStyle.value?.paddingBottom).toBe('56.25%')

      props.aspectRatio = '2'
      expect(aspectStyle.value?.paddingBottom).toBe('50%')
    })
  })
})
