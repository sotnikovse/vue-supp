import { computed } from 'vue'

import { convertToUnit } from '../utils'

export interface DimensionProps {
  height?: number | string
  maxHeight?: number | string
  maxWidth?: number | string
  minHeight?: number | string
  minWidth?: number | string
  width?: number | string
}

type PropNames = keyof DimensionProps

export function useDimensionProps(defaults?: DimensionProps) {
  const props = {
    height: [Number, String],
    maxHeight: [Number, String],
    maxWidth: [Number, String],
    minHeight: [Number, String],
    minWidth: [Number, String],
    width: [Number, String],
  }

  if (defaults) {
    return Object.keys(props).reduce((obj, prop) => {
      const definition = props[prop as PropNames]
      if (prop in defaults) {
        obj[prop as PropNames] = {
          type: definition,
          default: defaults[prop as PropNames],
        }
      } else {
        obj[prop as PropNames] = definition
      }

      return obj
    }, {} as { [K in PropNames]: typeof props[K] | { type: typeof props[K]; default: DimensionProps[K] } })
  } else {
    return props
  }
}

export function useDimension(props: DimensionProps) {
  const dimensionStyles = computed(() => ({
    height: convertToUnit(props.height),
    maxHeight: convertToUnit(props.maxHeight),
    maxWidth: convertToUnit(props.maxWidth),
    minHeight: convertToUnit(props.minHeight),
    minWidth: convertToUnit(props.minWidth),
    width: convertToUnit(props.width),
  }))

  return { dimensionStyles }
}
