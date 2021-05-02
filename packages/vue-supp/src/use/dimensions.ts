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

const PROPS = {
  width: {
    type: [Number, String],
  },
  height: {
    type: [Number, String],
  },
  maxWidth: {
    type: [Number, String],
  },
  maxHeight: {
    type: [Number, String],
  },
  minWidth: {
    type: [Number, String],
  },
  minHeight: {
    type: [Number, String],
  },
}

type PropValue = string | number | null | undefined
type PropNames = keyof typeof PROPS

export const dimensions = <S extends PropNames>(...possibleProps: S[]) => {
  const selectedProps = possibleProps.length
    ? possibleProps
    : (Object.keys(PROPS) as S[])

  const useDimensionsProps = (defaults?: Partial<Record<S, PropValue>>) => {
    const props = selectedProps.reduce((acc, key) => {
      acc[key] = PROPS[key]
      return acc
    }, {} as Record<S, Prop<PropValue>>)

    if (defaults) {
      return selectedProps.reduce((acc, key) => {
        const prop = props[key] as Record<S, Prop<PropValue>>
        acc[key] = {
          ...prop,
          default: defaults[key],
        }
        return acc
      }, {} as Record<S, Prop<PropValue>>)
    } else {
      return props
    }
  }

  const useDimensions = (props: Partial<Record<S, PropValue>>) => {
    const dimensionsStyles = computed(() => {
      return selectedProps.reduce((acc, key) => {
        const value: PropValue = props[key]
        if (value) {
          acc[key] = convertToUnit(value)
        }
        return acc
      }, {} as Record<S, string | undefined>)
    })

    return {
      dimensionsStyles,
    }
  }

  return {
    useDimensionsProps,
    useDimensions,
  }
}
