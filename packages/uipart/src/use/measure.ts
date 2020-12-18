import { computed, Prop, PropType } from 'vue'

import { toUnit } from '../util/convert'

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
type MeasurePropDefinitions = Record<PropNames, any>
type MeasurePropValues = Record<PropNames, PropValue>

/**
 * @param {Object} defaults The set of default values.
 * @param {Object} props Props.
 */
export const useMeasureProps = (defaults?: Partial<MeasurePropValues>, props?: Partial<MeasurePropDefinitions>) => {
  const _props = props ?? PROPS
  if (defaults) {
    return Object.keys(_props).reduce((acc, curr) => {
      const key = curr as PropNames
      const prop = _props[key] as MeasurePropDefinitions
      acc[key] = {
        ...prop,
        default: defaults[key as PropNames],
      }
      return acc
    }, {} as MeasurePropDefinitions)
  } else {
    return _props
  }
}

/**
 * @param {Object} props The props of use-case, readonly/reactive proxy.
 * @param {string|number} [props.width] The width.
 * @param {string|number} [props.height] The height.
 * @param {string|number} [props.maxWidth] The max width.
 * @param {string|number} [props.maxHeight] The max height.
 * @param {string|number} [props.minWidth] The min width.
 * @param {string|number} [props.minHeight] The min height.
 * @param {Array} [possibleProps] Selected props.
 */
export const useMeasure = <S extends PropNames>(props: Partial<MeasurePropValues>, possibleProps: S[] = []) => {
  const selectedProps = possibleProps.length ? possibleProps : Object.keys(PROPS)
  const measureStyles = computed(() => {
    return selectedProps.reduce((acc, key) => {
      const value: PropValue = props[key as S]
      if (value) {
        acc[key as S] = toUnit(value)
      }
      return acc
    }, {} as Record<S, string | undefined>)
  })

  return {
    measureStyles,
  }
}

/**
 * @param {Array} [possibleProps] The props name.
 */
export const measure = <S extends PropNames>(...possibleProps: S[]) => {
  const selectedProps = possibleProps.length ? possibleProps : Object.keys(PROPS) as PropNames[]
  const props = selectedProps.reduce((acc, key) => {
    acc[key as S] = PROPS[key]
    return acc
  }, {} as Record<S, any>)

  return {
    useMeasureProps: (defaults?: Partial<MeasurePropValues>) => useMeasureProps(defaults, props),
    useMeasure: (propsValues: Partial<MeasurePropValues>) => useMeasure(propsValues, selectedProps),
  }
}
