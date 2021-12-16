/**
 * Clamps number within the inclusive min and max bounds.
 *
 * @category Number
 */
export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}
