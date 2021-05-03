import { computed, Prop } from 'vue'

import convertToUnit from '../utils/convertToUnit'

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
  } as Record<PropNames, Prop<number | string | undefined>>

  if (defaults) {
    return Object.keys(props).reduce<any>((obj, prop) => {
      const definition = props[prop as PropNames]
      if (prop in defaults) {
        obj[prop] = {
          type: definition,
          default: defaults[prop as PropNames],
        }
      } else {
        obj[prop] = definition
      }

      return obj
    }, {})
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
